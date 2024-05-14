
export interface DashboardDirectory{
    dashboardId?: string,
    deviceId?: string,
    dashboardName?: string,
    manufDeviceId?: string,
    deviceName?: string,
    companyId?: string,
    companyName?: string,
    startDate?: string,
    endDate?: string
}

export interface SpecificDashboard{
    dashboardId: string,
    deviceId: string,
    dashboardName: string,
    manufDeviceId: string,
    deviceName: string,
    companyId: string,
    companyName: string,
    dashboardOwner: string,
    speed: string,
    startDate: string,
    endDate: string,
    dashboardType: string,
    statChartTypeId: string,
    timeChartTypeId: string,
    markerIconId: string,
    ctCharTypeName: string,
    chartImage: string,
    iconName: string,
    iconImage: string,
}

export interface MarkerIcon{
    markerIconId: string,
    iconName: string,
    iconImage: string,
}

export interface ChartTypeModel{
    chartTypeId: string,
    charTypeName: string,
    charTypeCategory: string,
}

export enum VisualizationTypes{
    dashboard = 'dashboard',
    geolocation = 'geolocation'
}

export interface StaticChart{
    attribute: string,
    attributeValue: string,
    deviceId: string,
    dashboardName: string,
    dashboardType: string,
    dashboardOwner: string,
    statChartTypeId: string,
    charTypeName: string,
    charTypeCategory: string,
    deviceName: string,
    manufDeviceId: string,
    devNetwkTime: string,
    companyId: string,
    companyName: string,
    markerIconId: string,
    minGaugeValue: number,
    maxGaugeValue: number
}

export interface TimeSeriesChart{
    attribute: string,
    attributeValue: string,
    deviceId: string,
    dashboardName: string,
    dashboardType: string,
    dashboardOwner: string,
    statChartTypeId: string,
    charTypeName: string,
    charTypeCategory: string,
    deviceName: string,
    manufDeviceId: string,
    devNetwkTime: string,
    companyId: string,
    companyName: string,
    markerIconId: string
}

export interface DeviceGeolocation{
    latitude: string,
    longitude: string,
    deviceId: string,
    dashboardName: string,
    dashboardType: string,
    dashboardOwner: string,
    manufDeviceId: string,
    devNetwkTime: string,
    companyId: string,
    companyName: string,
    markerIconId: string,
    rawMessageId: string,
    position: string,
}

export enum DeviceAttributeType{
    CENTIGRADE = "Temperature (Cent)",
    FAHRENHEIT = "Temperature (Far)",
    HUMIDITY = 'Humidity'
}

export interface AssetTracker{
    deviceId: string,
    dashboardName: string,
    dashboardType: string,
    dashboardOwner: string,
    manufDeviceId: string,
    companyId: string,
    companyName: string,
    markerIconId: string,
    location: string[]
}

export enum ChartTypeEnum {
    PIE = 'pie',
    DOUGHNUT = 'doughnut',
    GAUGE = 'gauge',
    LINE = 'line',
    BAR = 'bar'
}

export interface DashboardDevice{
    deviceId: string,
    manufDeviceId: string,
    deviceName: string,
}

export interface DashboardOwner{
    userId: string,
    firstName: string,
    lastName: string,
}

export interface DashboardForm{
    dashBoardId: string
    deviceId: string
    dashBoardName: string
    dashBoardType: string
    dashBoardOwner: string
    createdBy: string
    statChartTypeId?: string
    timeChartTypeId?: string
    markerIconId?: string
    speed?: string
}

export enum StaticChartTypeImg{
    PIE = 'https://res.cloudinary.com/bash/image/upload/v1632610786/pie.png',
    DOUGHNUT = 'https://res.cloudinary.com/bash/image/upload/v1632610786/doughnut.gif',
    GAUGE = 'https://res.cloudinary.com/bash/image/upload/v1632610786/gauge.png'
}

export enum TimeChartTypeImg{
    BAR = 'https://res.cloudinary.com/bash/image/upload/v1632610786/bar_graph.gif',
    LINE = 'https://res.cloudinary.com/bash/image/upload/v1632645587/line_graph.png'
}