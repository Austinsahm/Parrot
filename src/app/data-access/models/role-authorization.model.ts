export interface AuthCompanyRole {
  roleId: string;
  roleName: string;
  companyId: string;
}

export interface SpecificCompanyRole {
  menuCategId: string;
  categName: string;
  portal: string;
  menuId: string;
  menuName: string;
  authorizationId: string;
  menuAccess: string;
  creater: string;
  reader: string;
  updater: string;
  deleter: string;
  roleId: string;
  roleName: string;
  companyId: string;
  companyName?: string;
  companyTypeId?: string;
  companyTypeName?: string;
}

export enum Portal {
  Partner = "Partner",
  Corporate = "Corporate",
  Individual = "Individual",
}

export interface Menu {
  title: string;
  data: SpecificCompanyRole[];
}

export interface PermissionAction {
  menuAccess: boolean;
  creater: boolean;
  updater: boolean;
  reader: boolean;
  deleter: boolean;
}

export interface CorporatePermissionCategory {
  dashboards: {
    useCaseDashboard: PermissionAction;
    assetTracker: PermissionAction;
    viewGeolocation: PermissionAction;
    mapGeolocationDesign: PermissionAction;
    dashboardDesign: PermissionAction;
    viewDashboard: PermissionAction;
  };
  eventsMonitoring: {
    alert: PermissionAction;
  };
  reports: {
    deviceHistory: PermissionAction;
    billing: PermissionAction;
    deviceMessages: PermissionAction;
    deviceMessagesSummary: PermissionAction;
    deviceListSummary: PermissionAction;
    deviceList: PermissionAction;
    assetList: PermissionAction;
  };
  security: {
    users: PermissionAction;
    groupRoles: PermissionAction;
    userDeviceAccess: PermissionAction;
    roleAuthorization: PermissionAction;
    changePassword: PermissionAction;
  };
  utility: {
    bulkDeviceLoad: PermissionAction;
  };
  setup: {
    deviceConfig: PermissionAction;
    asset: PermissionAction;
    location: PermissionAction;
  };
}

export interface PartnerPermissionCategory {
  companyManagement: {
    company: PermissionAction;
    summary: PermissionAction;
    whiteLabel: PermissionAction;
    billing: PermissionAction;
  };
  deviceManagement: {
    device: PermissionAction;
    deviceCategory: PermissionAction;
  };
  reports: {
    companyLists: PermissionAction;
    companyLocations: PermissionAction;
    companyBilling: PermissionAction;
    deviceLists: PermissionAction;
    deviceSummary: PermissionAction;
    deviceMessages: PermissionAction;
  };
  utility: {
    bulkDeviceLoad: PermissionAction;
  };
  security: {
    changePassword: PermissionAction;
    users: PermissionAction;
    groupRoles: PermissionAction;
    userDeviceAccess: PermissionAction;
    roleAuthorization: PermissionAction;
  };
}

export interface RoleAuthorizationUpdate {
  roleId: string;
  access: MenuCateg[];
}

export interface MenuCateg {
  menuCategId: string;
  menus: AuthMenu[];
}

export interface AuthMenu {
  menuId: string;
  authorizationId: string;
  actions: {
    menuAccess: string;
    creater: string;
    updater: string;
    reader: string;
    deleter: string;
  };
}

export interface DefaultCompanyParams {
  start_dashbd_date: string;
  start_device_rep_date: string;
  start_mess_rep_date: string;
  start_compy_rep_date: string;
  start_billing_rep_date: string;
  end_date: string;
}
