export enum ShapeName {
  circle = "CIRCLE",
  rect = "RECTANGLE",
  polygon = "POLYGON",
  triangle = "TRIANGLE",
}

export interface Points {
  lat: number;
  lng: number;
  index?: number;
}

interface RectPoints {
  east: number;
  west: number;
  north: number;
  south: number;
}

export interface Shape {
  code: string;
  name: ShapeName;
  radius?: string;
  points: Points[] | RectPoints[];
}

export interface ShapeDataForm {
  headerName: string;
  categoryId: string;
  shapes: Shape[];
  headerId?: string;
}

export interface GeofencingHeaderResponse {
  geofencing_hder_id: string;
  geofencing_hder_name: string;
  client_device_categ_id: string;
}

export interface GeofenceDataSource {
  sourceCount: string;
  deviceId: string;
  dataSource: string;
}

export interface DeviceCoordinates extends Points {
  time: string;
  seqNumber: number;
}

export enum GeofenceSource {
  WIFI = "WIFI",
  SIGFOX = "SIGFOX",
  GPS = "GPS",
}

export interface AddressData {
  results: [{ formatted_address: string }];
}
