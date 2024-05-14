import {
  CompanyTypeCode,
  DeviceAttribute,
} from "../data-access/models/company.model";
import {
  BatteryAttribute,
  BatteryLevel,
  BatteryStatus,
  DeviceAttributeStatus,
  DeviceMode,
  DoorAttr,
  IiconData,
  LinkQuality,
  PowerStatus,
  WirelessStatus,
} from "../data-access/models/device.model";
import { Domain } from "../data-access/models/domain.model";
import { UserSessionInformation } from "./user.service";
import { UseCase } from "src/app/data-access/models/use-case.model";
import { devicesLogDetails } from "../data-access/models/device-logs.model";

function isCorporate(code: CompanyTypeCode): boolean {
  return [CompanyTypeCode.INDIVIDUAL, CompanyTypeCode.CORPORATE].includes(code);
}

/**
 * Checks if a given user is a corporate user
 * @param user
 */
export function isCorporateUser(user: UserSessionInformation): boolean {
  return isCorporate(user?.companyTypeName as CompanyTypeCode);
}

export function isPartnerUser(user: UserSessionInformation): boolean {
  return [CompanyTypeCode.PARTNER].includes(
    user?.companyTypeName as CompanyTypeCode
  );
}

/**
 * Checks if a domain/company is corporate
 * @param domain
 */
export function isCorporateDomain(domain: Domain): boolean {
  return isCorporate(domain?.companyType);
}

export function deviceDashboardIconSet(
  attribute: string,
  attributeValue: string
): IiconData {
  // console.log('att:',attribute,'value:',attributeValue);

  let iconData: IiconData = { color: "", icon: [] };

  iconData = powerIcon(attributeValue);

  // console.log('att:', attribute, 'val:', attributeValue, 'data:', iconData);

  if (!iconData.icon.length) {
    iconData = batteryIcon(attribute, attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = wirelessIcon(attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = deviceModeIcon(attributeValue);
  }

  if (!iconData.icon.length) {
    // if(attribute.toLowerCase() === 'link quality')
    iconData = linkQuality(attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = doorIcon(attribute, attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = tempHumidity(attribute, attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = waterLeak(attribute, attributeValue);
  }
  return iconData;
}

export function batteryIcon(
  attribute: string,
  value: number | string
): IiconData {
  let iconData: IiconData = { color: "", icon: [] };

  switch (attribute) {
    case BatteryAttribute.BatteryLevel:
      iconData = batteryLevel(value as string);
      break;
    case BatteryAttribute.BatteryStatus:
      iconData = batteryStatus(value as string);
      break;
    case BatteryAttribute.Battery:
      iconData = { icon: ["fas", "bolt"], color: "yellow" };
      break;
    default:
      break;
  }
  return iconData;
}

export function batteryRange(value: number): IiconData {
  let icon = [];
  let color = "";

  if (value >= 0 && value <= 20) {
    icon = ["fas", "battery-full"];
    color = "green";
    return { icon, color };
  }

  if (value >= 21 && value <= 40) {
    icon = ["fas", "battery-three-quarters"];
    color = "yellow";
    return { icon, color };
  }

  if (value >= 41 && value <= 60) {
    icon = ["fas", "battery-half"];
    color = "orange";
    return { icon, color };
  }

  if (value >= 61 && value <= 80) {
    icon = ["fas", "battery-quarter"];
    color = "red";
    return { icon, color };
  }

  if (value >= 81) {
    icon = ["fas", "battery-empty"];
    color = "red";
    return { icon, color };
  }
}

export function batteryLevel(value: string): IiconData {
  let icon = [];
  let color = "";

  switch (value) {
    case BatteryLevel.High:
      icon = ["fas", "battery-full"];
      color = "green";
      break;
    case BatteryLevel.Medium:
      icon = ["fas", "battery-three-quarters"];
      color = "yellow";
      break;
    case BatteryLevel.Low:
      icon = ["fas", "battery-half"];
      color = "orange";
      break;
    case BatteryLevel.Critical:
      icon = ["fas", "battery-quarter"];
      color = "red";
      break;

    default:
      break;
  }
  return { icon, color };
}

export function batteryStatus(value: string): IiconData {
  let icon = [];
  let color = "";

  switch (value.toLowerCase()) {
    case BatteryStatus.GoodBattery:
    case BatteryStatus.VeryGoodBattery:
      icon = ["fas", "battery-full"];
      color = "green";
      break;
    case BatteryStatus.GoodBatteryLor:
      icon = ["fas", "battery-three-quarter"];
      color = "blue";
      break;
    case BatteryStatus.LowBatteryLor:
      icon = ["fas", "battery-quarter"];
      color = "yellow";
      break;
    case BatteryStatus.UltraLowBattery:
      icon = ["fas", "battery-empty"];
      color = "red";
      break;
    case BatteryStatus.LowBattery:
      icon = ["fas", "battery-quarter"];
      color = "red";
      break;

    default:
      break;
  }
  return { icon, color };
}

export function powerIcon(attributeValue: string): IiconData {
  let value = attributeValue.toLowerCase();
  let icon =
    value === PowerStatus.Off
      ? ["fas", "toggle-off"]
      : value === PowerStatus.On
      ? ["fas", "toggle-on"]
      : [];
  let color =
    value === PowerStatus.Off
      ? "red"
      : value === PowerStatus.On
      ? "green"
      : "white";
  return { icon, color };
}

export function wirelessIcon(attributeValue: string): IiconData {
  let sigfox = "assets/images/sigfox-logo.ico";
  let lora = "assets/images/lora.png";
  let nb = "assets/images/nb_iot.png";

  let value = attributeValue.toLowerCase();
  // let icon = (value === WirelessStatus.WiFi || value === WirelessStatus.RSSI) ? ['fas', 'wifi'] : [];
  let icon =
    value === WirelessStatus.WiFi
      ? ["fas", "wifi"]
      : value === WirelessStatus.RSSI
      ? ["fas", "wifi"]
      : value === WirelessStatus.SIGFOX
      ? ["", sigfox]
      : value === WirelessStatus.LORA
      ? ["", lora]
      : value === WirelessStatus.NB
      ? ["", nb]
      : [];
  let color = "blue";
  return { icon, color };
}

export function deviceModeIcon(attributeValue: string): IiconData {
  let icon = [];
  let color = "blue";

  let value = attributeValue.toLowerCase();

  switch (value) {
    case DeviceMode.GPSScanned:
      icon = ["fas", "map-marker-alt"];
      break;
    case DeviceMode.WiFi2Mac:
      icon = ["fas", "wifi"];
      break;
    case DeviceMode.WiFi3Mac:
      icon = ["fas", "wifi"];
      break;
    case DeviceMode.WiFiMac:
      icon = ["fas", "wifi"];
      break;

    default:
      break;
  }
  return { icon, color };
}

export function linkQuality(attributeValue: string): IiconData {
  let icon = [];
  let color = "";

  let value = attributeValue.toUpperCase();

  switch (value.toUpperCase()) {
    case LinkQuality.EXCELLENT:
      icon = ["fas", "signal"];
      color = "green";
      break;
    case LinkQuality.GOOD:
      icon = ["fas", "signal"];
      color = "yellow";
      break;
    case LinkQuality.AVERAGE:
      icon = ["fas", "signal"];
      color = "orange";
      break;
    case LinkQuality.LIMIT:
      icon = ["fas", "signal"];
      color = "red";
      break;

    default:
      break;
  }
  // console.log(value, icon, color);
  return { icon, color };
}

export function modeStateIcon(
  attribute: string,
  attributeValue: string
): IiconData {
  let icon = [];
  let color = "";
  if (attribute === DoorAttr.mode) {
    icon =
      attributeValue === "0" ? ["fas", "toggle-off"] : ["fas", "toggle-on"];
    color = attributeValue === "0" ? "red" : "green";
  }
  return { icon, color };
}

export function doorIcon(attribute: string, attributeValue: string): IiconData {
  let icon = [];
  let color = "";
  if (attribute === DoorAttr.doorStatus) {
    icon =
      attributeValue === "0" ? ["fas", "door-closed"] : ["fas", "door-open"];
    color = attributeValue === "0" ? "green" : "red";
  }
  if (attribute === WirelessStatus.RSSI || attribute === WirelessStatus.SNR) {
    icon = ["fas", "wifi"];
    color = "blue";
  }
  return { icon, color };
}

function tempHumidity(attribute: string, attributeValue: string): IiconData {
  let icon = [];
  let color = "";
  const checkAtt = attribute.split(" ");
  if (checkAtt[0] === "Humidity") {
    icon = ["", "assets/images/humidity.svg"];
    color = "blue";
  }
  if (checkAtt[0] === "Temperature") {
    icon = ["fas", "temperature-high"];
    color = "blue";
  }
  return { icon, color };
}

function waterLeak(attribute: string, attributeValue: string): IiconData {
  let icon = [];
  let color = "";
  if (attribute === DeviceAttributeStatus.WaterLeakageStatus) {
    if (attributeValue === "1") {
      icon = ["", "assets/images/water-drop-drop.gif"];
      color = "";
    }
  }
  return { icon, color };
}
// export function linkQuality(attributeValue: string): IiconData{

// let value = attributeValue.toUpperCase();
// let value = attributeValue.toLowerCase();
// let icon = (value === LinkQuality.EXCELLENT || value === LinkQuality.GOOD ||  value === LinkQuality.AVERAGE ||  value === LinkQuality.LIMIT) ? ['fas', 'signal'] : [];
//   let icon = value === LinkQuality.EXCELLENT ? ['fas', 'signal'] : value === LinkQuality.GOOD ? ['fas', 'signal'] : value === LinkQuality.AVERAGE ? ['fas', 'signal'] : value === LinkQuality.LIMIT ? ['fas', 'signal'] : [];
//   let color = value === LinkQuality.EXCELLENT ? 'green' : value === LinkQuality.GOOD ? 'yellow' : value === LinkQuality.AVERAGE ? 'orange' : value === LinkQuality.LIMIT ? 'red' : 'white' ;
//   console.log(value);
//   return {icon, color};
// }

const returnUsesCase = (usecase: UseCase, icon: string): UseCase => {
  return {
    useCaseId: usecase.useCaseId,
    useCaseName: usecase.useCaseName,
    deviceQty: usecase.deviceQty,
    icon,
  };
};

export const changeAttributeValue = (
  att: DeviceAttribute | devicesLogDetails
): string => {
  if (att.attributeType == "1") {
    if (att.attribute === DeviceAttributeStatus.doorStatus) {
      if (att.attributeValue === "1") return "Opened";
      return "Closed";
    }
    if (att.attribute === DeviceAttributeStatus.WaterLeakageStatus) {
      if (att.attributeValue === "1") return "Leaking";
      return "Not Leaking";
    }
  }
  return att.attributeValue;
};

export const changeAttributeValueGuage = (title: string): string => {
  const [type, value] = title.split("-");  
  if (type === "DOOR_OPEN_STATUS ") {
    if (value === "1") return "Door Status - Opened";
    return "Door Status - Closed";
  }
  if (type === "WATER_LEAK_STATUS ") {
    if (value === "1") return "Water Leak Status - Leaking";
    return "Water Leak Status - Not Leaking";
  }
  return title;
};

export function usecasesIcon(useCases: UseCase[]): UseCase[] {
  return useCases.map((usecase) => {
    if (usecase.useCaseName === "Not Asssigned") {
      return returnUsesCase(usecase, "help");
    }
    if (usecase.useCaseName === "Agriculture") {
      return returnUsesCase(usecase, "agriculture");
    }
    if (usecase.useCaseName === "Asset Tracking") {
      return returnUsesCase(usecase, "share_location");
    }
    if (usecase.useCaseName === "Predictive Maintenance") {
      return returnUsesCase(usecase, "engineering");
    }
    if (usecase.useCaseName === "Smart Metering") {
      return returnUsesCase(usecase, "speed");
    }
    if (usecase.useCaseName === "Fleet Management") {
      return returnUsesCase(usecase, "local_shipping");
    }
    if (usecase.useCaseName === "Supply Chain Management") {
      return returnUsesCase(usecase, "precision_manufacturing");
    }
    if (usecase.useCaseName === "Oil and Gas Cargo Shipping") {
      return returnUsesCase(usecase, "oil_barrel");
    }
    if (usecase.useCaseName === "Wellhead Monitoring") {
      return returnUsesCase(usecase, "gas_meter");
    }
    if (usecase.useCaseName === "Refinery Monitoring") {
      return returnUsesCase(usecase, "gas_meter");
    }
    if (usecase.useCaseName === "Pipeline Monitoring") {
      return returnUsesCase(usecase, "gas_meter");
    }
    if (usecase.useCaseName === "Offshore Oil and Gas Rig Monitoring") {
      return returnUsesCase(usecase, "gas_meter");
    }
    if (usecase.useCaseName === "Asset Warehouse") {
      return returnUsesCase(usecase, "warehouse");
    }
    if (usecase.useCaseName === "Computer Asset") {
      return returnUsesCase(usecase, "devices");
    }
    if (usecase.useCaseName === "Asset Warehouse14") {
      return returnUsesCase(usecase, "warehouse");
    }
    if (usecase.useCaseName === "Asset Warehouse_15") {
      return returnUsesCase(usecase, "warehouse");
    }
    if (usecase.useCaseName === "Block Chain management") {
      return returnUsesCase(usecase, "lan");
    }
    if (usecase.useCaseName === "Block Chain management") {
      return returnUsesCase(usecase, "lan");
    } else {
      return returnUsesCase(usecase, "add_box");
    }
  });
}
