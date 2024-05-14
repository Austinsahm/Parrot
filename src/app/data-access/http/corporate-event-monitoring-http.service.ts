import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  CompanyParametersDataForm,
  NotificationAlert,
  NotificationAlertDataForm,
  UserAlert,
} from "../models/alert-notification.model";
import { Response, StatusCode } from "../models/http.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable({
  providedIn: "root",
})
export class CorporateEventMonitoringHttpService extends BaseHttpService {
  constructor(
    protected readonly httpClient: HttpClient,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
  }

  listUsersAlert(subdomain: string): Observable<UserAlert[]> {
    const url = this.buildUrl(
      `alertnotice/alertnotice_yes/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<UserAlert[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  alertnotification(subdomain: string): Observable<NotificationAlert> {
    const url = this.buildUrl(
      `alertnotice/alert_methods/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<NotificationAlert>>(url), [
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  updateNotification(formData: NotificationAlertDataForm): Observable<any> {
    const url = this.buildUrl("alertnotice/company-alert-recipient");
    return this.checkWrite(this.httpClient.put<Response<any>>(url, formData), [
      StatusCode.OK,
      StatusCode.CREATED,
    ]);
  }

  updateCompanyParameter(formData: CompanyParametersDataForm): Observable<any> {
    const url = this.buildUrl("reports/update-report-day-param");
    return this.checkWrite(this.httpClient.put<Response<any>>(url, formData), [
      StatusCode.OK,
      StatusCode.CREATED,
    ]);
  }

  getCompanyParameters(
    companyId: string
  ): Observable<CompanyParametersDataForm> {
    const url = this.buildUrl(
      `company/company-days-parameter/companyId/${companyId}`
    );
    return this.check(
      this.httpClient.get<Response<CompanyParametersDataForm>>(url),
      [StatusCode.OK, StatusCode.SUCCESS]
    );
  }
}
