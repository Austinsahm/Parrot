export interface DeviceListReportFilter {
    format: string;
    from: string;
    fromCompany: string;
    statusId: string;
    to: string;
    toCompany: string;
    networkId:string
}

export interface CorporateDeviceListReportFilter {
    format: string;
    from: string;
    fromCategory: string;
    statusId: string;
    to: string;
    toCategory: string;
    networkId: string;
}

export interface DeviceListReportEntry {
    manufDeviceId:string
    deviceName: string;
    assetName: string;
    companyName: string;
    createdDate: string;
    statusId: string;
    statusName: string;
    deviceCategName: string;
    locationName: string;
    cityName: string;
    stateName: string;
    networkName: string;
}

export interface DeviceListSummaryReportFilter extends DeviceListReportFilter { }

export interface DeviceMessageReportFilter extends DeviceListReportFilter { }

export interface DeviceMessageReportEntry {
    companyName: string;
    deviceId: string;
    deviceName: string;
    messageDate: string;
    message: string;
    networkName: string;
}


export interface DeviceListSummaryReportEntry {
    count: number;
    companyName: string;
    deviceCategName: string;
    locationName: string;
    cityName: string;
    stateName: string;
}

export interface CompanyListReportFilter {
    format: string;
    from: string;
    statusId: string;
    to: string;
    typeId: string;
}

export interface CompanyListReportEntry {
    companyName: string;
    companyTypeName?: string,
    companyTypeId: string,
    statusName: string;
    createdDate: Date;
}

export interface CompanyLocationReportFilter {
    format: string;
    from: string;
    fromCity: string;
    fromState: string;
    statusId: string;
    to: string;
    toCity: string;
    toState: string;
    typeId: string;
}

export interface CompanyLocationReportEntry {
    companyName: string;
    companyTypeName: string;
    locationName: string;
    stateName: string;
    cityName: string;
    statusName: string;
    createdDate: string;
}


export interface CompanySummaryReportFilter {
    format: string;
    from: string;
    statusId: string;
    to: string;
    typeId: string;
}

export interface CompanySummaryReportEntry {
    count: number;
    companyName: string;
    companyTypeName: string;
}


export interface CompanyBillingReportFilter  extends DeviceListSummaryReportFilter {}

export interface CompanyBillingReportEntry {
    companyName: string;
    deviceId: string;
    deviceName: string;
    messageDate: string;
    messageCount: string;
    messagePrice: string;
    messageBill: string;
}