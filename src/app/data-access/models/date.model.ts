export interface DateControlRawValue {
  year: number;
  month: number;
  day: number;
}

export interface DefaultDate {
  start_dashbd_date: string;
  start_device_rep_date: string;
  start_mess_rep_date: string;
  start_compy_rep_date: string;
  start_billing_rep_date: string;
  end_date: string;
  company_id?: string;
}
