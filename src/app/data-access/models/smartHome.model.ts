import { DeviceAccess, DeviceAttribute } from "./company.model";
export type Notify = "Y" | "N";

export interface SmartHomeDashboard {
  floorNumber: number;
  floorName: string;
  floorPlanId: string;
  devices: SmartHomeDevices[];
}

export interface Position {
  lat: string;
  lng: string;
}

export interface FloorDetails {
  features: [
    {
      id: string;
      properties: { name: string };
    }
  ];
}

export interface SmartHomeDevices {
  deviceId: string;
  manufDeviceId: string;
  deviceName: string;
  lastSeenMsgId?: string;
  lastseenDate?: string;
  companyId?: string;
  companyName?: string;
  statusId?: string;
  deviceCategName?: string;
  clientDeviceCategId?: string;
  network?: string;
  networkName?: string;
  floorNumber?: number;
  floorName?: string;
  utcTimestamp?: string;
  subscrEndDate?: string;
  subscrStartDate?: string;
  attributes?: DeviceAttribute[];
  pos?: number[];
  expanded?: boolean;
  path?: string;
  floorId?: string;
  notificationDue?: Notify;
  position?: Position;
  sensorIcon?: string;
}

export interface FloorPlanDevice {
  deviceId: string;
  deviceName?: string; // un
  manufDeviceId?: string; // un
  assetId?: string;
  floorId?: string;
  lat?: string;
  lng?: string;
  sensorIcon?: string;
}

export interface FloorPlanDeviceIcon {
  deviceId: string;
  manufDeviceId?: string;
  sensorId: string;
  sensorCategId?: string;
  sensorName?: string;
  sensorIcon: string;
  pos?: number[];
}

export interface IconPosData {
  pos?: number[];
  value: string;
  telemetry: string;
}

export interface FloorPlanDeviceSensor {
  deviceId: string;
  manufDeviceId?: string;
  sensorId: string;
  sensorCategId?: string;
  telemetry?: string;
  value?: string | number;
}

export interface SensorAttributeInfo {
  telemetry: string;
  value: string;
}
