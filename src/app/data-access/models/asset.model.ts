export interface Asset {
  assetId: string;
  assetName: string;
  locationName: string;
  assetTypeName: string;
  companyName: string;
  statusName: string;
  assetType: string;
}

export interface AssetDetail extends AssetTank {
  assetId: string;
  assetName: string;
  assetDesc: string;
  assetType?: string;
  assetTypeId: string;
  assetTypeName?: string;
  company?: string;
  userCompanyId?: string;
  companyId?: string;
  location?: string;
  locationId?: string;
  locationName?: string;
  userId: string;
  status?: string;
  statusId?: string;
}

export interface AssetType {
  assetId: string;
  assetName: string;
}

export interface AssetFloor {
  floorName: string;
  floorNumber: number;
  floorPlanId: string;
  assetId: string;
}

export interface AssetTank {
  totalVolume?: string;
  totalUsefVolume?: string;
  minUsefVolume?: string;
  delVolume?: string;
  consumption?: string;
  filling?: string;
  lastReading?: string;
  contentId?: string;
  contentName?: string;
  contentType?: string;
  height?: number;
  diameter?: number;
}

export interface AssetFormData extends AssetDetail {
  assetTankModel?: AssetTank;

  addDeviceList?: { deviceId: string }[];

  delDeviceList?: { deviceId: string }[];
}

export interface ContentType {
  contentType: string;
}

export interface SpecificContentType {
  contentId: string;
  useCaseName: string;
}

export interface FusionChart {
  theme: string;
  caption: string;
  subcaption: string;
  lowerLimit: string;
  upperLimit: string;
  lowerLimitDisplay: string;
  upperLimitDisplay: string;
  numberSuffix: string;
  cylFillColor: string;
  majorTMNumber?: string;
  showValue: string;
  dataStreamUrl?: string;
  refreshInterval?: string;
  refreshInstantly?: string;
  cylFillHoverColor?: string;
  cyloriginx?: string;
  cyloriginy?: string;
  cylradius?: string;
  cylheight?: string;
}

export interface FusionDataSource {
  chart: FusionChart;
  value: string;
}

export interface TankAssetResp {
  deviceId: string;
  deviceName: string;
  assetId: string;
  assetName: string;
  totalVolume: number;
  height: number;
  diameter: number;
  realTankLevel: string;
  realVolume: number;
  lat: string;
  lng: string;
  manufDeviceId: string;
}
