export interface UserAlert {
  userId: string;
  firstName?: string;
  lastName?: string;
  emailAddress: string;
  pryPhoneNo: string;
  altPhoneNo: string;
}

export interface NotificationAlert {
  sms: string | boolean;
  phone: string | boolean;
  email: string | boolean;
}

export enum NotificationAlertResponse {
  N = "N",
  Y = "Y",
}

export interface NotificationAlertDataForm {
  companyId: string;
  email: boolean;
  phone: boolean;
  sms: boolean;
  delUser: [{ userId: string }];
  addUser: [{ userId: string }] | UserAlert[];
  companyName?:string
}

export interface CompanyParametersDataForm {
  companyId?: string;
  email: boolean;
  phone: boolean;
  sms: boolean;
  device_rep_def_days: string;
  message_rep_def_days: string;
  company_rep_day: string;
  billing_rep_day: string;
  dashbd_def_days: string;
  coyDirectory?: CompanyViewDirctory;
}

export enum CompanyViewDirctory {
  ORGANOGRAM_HOR = "ORGANOGRAM_HOR",
  ORGANOGRAM_VTC = "ORGANOGRAM_VTC",
  TABULAR = "TABULAR",
}
