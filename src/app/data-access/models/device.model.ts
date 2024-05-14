/**
 * Device status
 */
export enum DeviceStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ALL = "ALL",
}

//Device Network
export enum DeviceNetwork {
  lor = "lor",
  N01 = "N01",
  R234 = "R234",
  sig = "sig",
  uncl = "uncl",
  ALL = "ALL",
}

/**
 * Device model
 */
export interface Device {
  deviceId: string;
  deviceName: string;
  assetId: string;
  assetName?: string;
  companyId?: string;
  companyName?: string;
  deviceCategName?: string;
  deviceCategoryName?: string;
  locationId?: String;
  locationName?: string;
  statusId: String;
  statusName?: DeviceStatus;
  locationAddress1?: String;
  locationAddress2: String;
  manufDeviceId?: string;
  networkId: string;
  networkName: string;
}

export interface DeviceDetail {
  deviceId: string;
  manufDeviceId: string;
  deviceName: string;
  deviceDesc: string;
  devicePac: string;
  clientDeviceCategId: string;
  clientDeviceCategName: string;
  networkId: string;
  networkName: string;
  manufacturerId: string;
  manufacturerName: string;
  manufDeviceTypeId: string;
  manufDeviceTypeName: string;
  assetId: string;
  assetName: string;
  statusId: string;
  statusName: string;
  lastSeenDate: Date;
  lastSeenMsgId: string;
  certificate: string;
  companyId?: string;
}

export interface DeviceConfigurationDirectory {
  configId: string;
  deviceId: string;
  alertMethod?: string;
  alertMethodVal1?: string;
  alertMethodVal2?: string;
  manufDeviceId: string;
  deviceName: string;
  assetId: string;
  assetName: string;
  manufDeviceTypeId: string;
  deviceTypeName: string;
  statusId: string;
  statusName: string;
  manufacturerId: string;
  manufacturerName: string;
  companyId: string;
  companyName: string;
  useCaseId: string;
  useCaseName: string;
  phoneNumb1?: string;
  phoneNumb2?: string;
  emailAddr1?: string;
  emailAddr2?: string;
}

export interface DeviceSensorDirectory {
  deviceSensorTransId?: string;
  configId?: string;
  deviceSensorRefId: string;
  sensorId?: string;
  sensorName?: any;
  minValue?: string;
  maxValue?: string;
  measure?: string;
  measureId?: string;
  tolerableTime?: string;
  timeUnitId?: string;
  measureName?: string;
  timeUnitName?: string;
}

export interface SensorComboEntry {
  deviceSensorRefId: string;
  sensorName: string;
  sensorId: string;
  configId: string;
}

export interface SensorMeasure {
  configId: string;
  sensorId: string;
  sensorName: string;
  measureId: string;
  measureName: string;
}

export interface DeviceDirectory {
  deviceId: string;
  deviceName: string;
}

export interface DeviceCategory
  extends DeviceCategoryDirectory,
    DeviceCategoryView {}

export interface DeviceCategoryDirectory {
  deviceCategId: string;
  deviceCategName: string;
  companyName: string;
  companyId?: string;
  networkId: string;
  networkName: string;
}

export interface DeviceCategoryView {
  deviceCategName: string;
  deviceCategDesc: string;
  companyId?: string;
  companyName: string;
}

export interface DeviceFormData {
  companyId: string;
  userId: string;
  deviceAdd?: DeviceDetail[];
  deviceDel?: { deviceId: string }[];
}

export interface DeviceCategoryFormData {
  companyId: string;
  userId: string;
  clientDeviceCategId: string;
  deviceCategName: string;
  deviceCategDesc: string;
  deviceAdd?: { deviceId: string }[];
  deviceDel?: { deviceId: string }[];
}

export interface DeviceMoreDetail {
  deviceId: string;
  deviceName: string;
  attribute: string;
  attributeValue: string;
  attributeType: string;
  lastSeenMsgId: string;
}

export interface LocationDevice extends DeviceDirectory {
  assetName: string;
}

export interface DeviceConfigurationFormData {
  configId: string;
  deviceId: string;
  useCaseId: string;
  sms: string;
  email: string;
  phone: string;
  phoneNumb1: string;
  phoneNumb2: string;
  emailAddr1: string;
  emailAddr2: string;
  assetId: string;
  deviceSensorTransList: DeviceSensorDirectory[];
}

export interface DeviceMessage {
  rawMessageId?: string;
  rawMessage?: string;
  devNetwkTime?: string;
  deviceId?: string;
  deviceName?: string;
  manufDeviceId?: string;
  attribute?: string;
  attributeValue?: string;
  companyId?: string;
  companyName?: string;
  message?: string;
  messageDate?: string;
}

export interface BulkDevice {
  userId: string;
  comapnyId: string;
  uploadFile: string;
}

export enum BatteryAttribute {
  BatteryStatus = "Battery Status",
  BatteryLevel = "Battery Level",
  Battery = "Battery",
}

export enum BatteryLevel {
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Critical = "Critical",
}

export enum BatteryStatus {
  GoodBattery = "good battery",
  LowBattery = "low battery",
  VeryGoodBattery = "very good",
  GoodBatteryLor = "good",
  LowBatteryLor = "low",
  UltraLowBattery = "ultra low",
}

export enum PowerStatus {
  Off = "off",
  On = "on",
}

export enum WirelessStatus {
  WiFi = "wifi",
  RSSI = "RSSI",
  SIGFOX = "sigfox",
  LORA = "lora",
  NB = "nb-iot",
  SNR = "SNR",
}

export interface IiconData {
  icon: string[];
  color: string;
}

export enum DeviceMode {
  WiFiMac = "wifi 2macs scanned",
  GPSScanned = "gps scanned",
  WiFi3Mac = "3 wifi macs scanned",
  WiFi2Mac = "2 wifi macs scanned",
}

export enum LinkQuality {
  EXCELLENT = "EXCELLENT",                        
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  LIMIT = "LIMIT",
}

export enum DoorAttr {
  mode = "Mode",
  lastDorrDur = "LAST_DOOR_OPEN_DURATION",
  alarm = "ALARM",
  battery = "Battery",
  doorOpenTimes = "DOOR_OPEN_TIMES",
  doorStatus = "DOOR_OPEN_STATUS",
}

export enum DeviceAttributeStatus {
  doorStatus = "DOOR_OPEN_STATUS",
  WaterLeakageStatus = "WATER_LEAK_STATUS",
}
