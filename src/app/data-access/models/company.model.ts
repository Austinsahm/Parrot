import { NotificationAlertResponse } from "./alert-notification.model";

/**
 * Company type code
 */
export const enum CompanyTypeCode {
  ALL = "ALL",
  PARTNER = "PARTNER",
  CORPORATE = "CORPORATE",
  INDIVIDUAL = "INDIVIDUAL",
}

export interface CompanyType {
  companyTypeId: CompanyTypeCode;
  companyTypeName: string;
  companyTypeDesc: string;
}

/**
 * Company status
 */
export const enum CompanyStatusCode {
  ACTIVE = "ACTIVE",
}

/**
 * Company model
 */
export interface Company {
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyAddress1: string;
  companyAddress2?: string;
  statusName: CompanyStatusCode;
  companyType: CompanyTypeCode;
  companyTypeId?: CompanyTypeCode;
}

export interface CompanyBilling {
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
}

export interface PaystackData {
  transactionId: string;
  date: string;
  userId: string;
  companyId: string;
  amount: number;
  transactionRef: string;
  emailAddress: string;
}

export interface CompanyOrganogram {
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyTypeId?: CompanyTypeCode;
  statusName: CompanyStatusCode;
  parentCompanyId: string;
  parentCompany: string;
  level: number;
  countryId: number;
  children: ChildCompanyOrganogram[];
}

export interface ChildCompanyOrganogram {
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyTypeId?: CompanyTypeCode;
  statusName: CompanyStatusCode;
  parentCompanyId: string;
  parentCompany: string;
  level: number;
  countryId: number;
  children: ChildCompanyOrganogram[];
}

export interface CompanyBranch {
  locationId: string;
  locationName: string;
}

export interface CompanyLocation extends CompanyBranch {
  locationAddress: string;
  stateId: string;
  cityId: string;
  cityName: string;
  stateName: string;
  locationAddress1?: string;
  locationAddress2?: string;
  LocationDesc?: string;
}

export interface CompanyUser {
  userId?: string;
  firstName?: string;
  emailAddress?: string;
  emailaddress?: string;
  locationId?: string;
  locationName?: string;
  lastName?: string;
  statusId?: string;
  userRoleId?: string;
  userRoleName?: string;
  companyId?: string;
  companyName?: string;
  createdBy?: string;
  password?: string;
  userLoginName?: string;
  loginId?: string;
  pryPhoneNo?: string;
  altPhoneNo?: string;
  adminPryPhoneNo?: string;
  adminAltPhoneNo?: string;
  roleId?: string;
  userTypeName?: string;
}

export interface CompanyUserFormData {}

export interface CompanyInformation extends Omit<Company, "companyType"> {
  timeZone: string;
  companyDesc: string;
  companyAlias: string;
  statusId: string;
  countryId: string;
  subdomain?: string;
  adminEmail?: string;
  companyTypeId?: CompanyTypeCode;
  subdomaIn?: string;
  companyUrl?: string;
}

/**
 * Full company details
 */
export interface CompanyDetail {
  type: CompanyInformation;
  companyLocation: CompanyLocation[];
  companyUser: CompanyUser[];
}

export interface DeleteUser {
  userId: string;
}

export interface DeleteLocation {
  locationId: string;
}

/**
 * Type representing data format for creating and updating companies
 */
export interface CompanyFormData extends CompanyInformation {
  locationAdd?: CompanyLocation[];
  userAdd?: CompanyUser[];
  locationDelete?: DeleteLocation[];
  userDelete?: DeleteUser[];
}

export interface CompanyForm {
  userCompanyId: string;
  userId: string;
  companies: CompanyFormData[];
}

export interface CompanyRole {
  roleId: string;
  roleName: string;
  roleDesc: string;
  companyId: string;
  companyName?: string;
  portal?: string;
  statusId?: string;
  addUserRole?: any[];
  delUserRole?: any[];
}

export interface ChangePasswordData {
  loginId: string;
  password: string;
  userId: string;
}

export interface UserStatType {
  label: string;
  value: number;
}

export interface UserStatDetail {
  firstName: string;
  lastName: string;
  label: string;
}

export interface StatDetail {
  name: string;
  status: string;
}

export interface PieDataType {
  Label: string;
  Value: number;
  Summary: string;
}

export interface DeviceStat {
  numActive: string;
  numInActive: string;
}

export interface DeviceStatDetail {
  deviceId: string;
  deviceName: string;
  manufDeviceId: string;
  companyId: string;
  companyName: string;
  lastSeenMsgId: string;
  lastSeenDate: string;
  itemList: DeviceAttribute[];
  tab1: DeviceAttribute[];
  tab2?: DeviceAttribute[];
  tab3?: DeviceDashboardStaticChart[];
  tab4?: DeviceDashboardTimeSeriesChart[];
  tab5?: DeviceDashboardGeolocation;
  tab6?: DeviceDashboardAssetTracker;
  deviceStatus: string;
  clientDeviceCategId: string;
  deviceCategName: string;
  tab7?: DeviceAlert[];
  subscrValid: string;
  network: string;
  network_name: string;
  //  subscriptionMsg:string|null
}

export interface DeviceAlert {
  alertId: string;
  message: string;
  alertInitTime: string;
  alertCurTime: string;
  notificatnDue: string;
  alertAck: string;
  actionTaken: string;
  deviceId: string;
  sensorId: string;
}
export interface DeviceDashboardAssetTracker {
  latitude: string;
  longitude: string;
  deviceId: string;
  dashboardName: string;
  dashboardType: string;
  dashboardOwner: string;
  manufDeviceId: string;
  devNetwkTime: string;
  companyId: string;
  companyName: string;
  markerIconId: string;
  rawMessageId: string;
  position: string;
}

export interface DeviceDashboardGeolocation {
  deviceId: string;
  dashboardName: string;
  dashboardType: string;
  dashboardOwner: string;
  manufDeviceId: string;
  companyId: string;
  companyName: string;
  markerIconId: string;
  location: string[];
}

export interface DeviceDashboardStaticChart {
  attribute: string;
  attributeValue: string;
  deviceId: string;
  dashboardName: string;
  dashboardType: string;
  dashboardOwner: string;
  statChartTypeId: string;
  charTypeName: string;
  charTypeCategory: string;
  deviceName: string;
  manufDeviceId: string;
  devNetwkTime: string;
  companyId: string;
  companyName: string;
  markerIconId: string;
  minGaugeValue: string;
  maxGaugeValue: string;
  tab: string;
}

export interface DeviceDashboardTimeSeriesChart {
  attribute: string;
  attributeValue: string;
  deviceId: string;
  dashboardName: string;
  dashboardType?: string;
  dashboardOwner?: string;
  statChartTypeId?: string;
  charTypeName: string;
  charTypeCategory: string;
  deviceName: string;
  manufDeviceId: string;
  devNetwkTime: string;
  companyId: string;
  companyName: string;
  markerIconId?: string;
  minGaugeValue: string;
  maxGaugeValue: string;
  tab: string;
}

export interface DeviceAttribute {
  attribute: string;
  attributeValue: string;
  attributeType: string;
  rawMessageId: string;
  devNetwkTime: string;
  showInDashbd: string;
  deviceIcon?: string[];
  iconColor?: string;
  netwkSeqNo?: number;
  dataGroup: any;
}

export interface DeviceListStat {
  deviceId: string;
  deviceName: string;
  manufDeviceId: string;
  lastSeenDate: string;
  attributeList: AttributeList[];
  deviceStatus: string;
  clientDeviceCategId: string;
  isCollapsed: boolean;
  deviceCategName: string;
  subscrValid: boolean;
  device: DataDetails;
  network?: string;
  network_name?: string;
}

export interface DataDetails {
  deviceId: string;
  tab3: boolean;
  tab4: boolean;
  tab5: boolean;
  deviceName: string;
  manufDeviceId: string;
  latitude: Number;
  longitude: Number;
}

export interface AttributeList {
  icon: string[];
  type: string;
  data: DeviceAttribute[] | StaticChartValue[] | TimeSeriesChartValue[];
}

export interface DeviceAccess {
  deviceId: string;
  deviceName: string;
  manufDeviceId: string;
  companyId?: string;
  companyName?: string;
  lastSeenDate?: string;
  statusId?: string;
}

export interface StaticChartValue {
  label: string;
  percentage: number;
  value: string;
  chartType: string;
}

export interface TimeSeriesChartValue {
  attribute: string;
  chartType: string;
  xAxesValues: string[];
  yAxesValues: number[];
}
