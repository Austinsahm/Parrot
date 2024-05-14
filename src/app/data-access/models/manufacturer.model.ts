export interface DeviceManufacturer {
    manufacturerId: string;
    manufacturerName: string;
}

export interface DeviceManufacturerDirectory extends DeviceManufacturer {
    manufacturerCode: string;
    manufacturerDescription: string;
}


export interface DeviceManufacturerType {
    manufDeviceTypeId: string;
    deviceTypeName: string;
}

export interface DeviceManufacturerTypeDirectory extends DeviceManufacturerType {
    manufacturerId: string;
    manufacturerName: string;
    deviceTypeDesc: string;
}