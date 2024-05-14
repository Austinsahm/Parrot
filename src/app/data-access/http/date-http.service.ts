import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DefaultDate } from "../models/date.model";
import { StatusCode, Response } from "../models/http.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable({
  providedIn: "root",
})
export class DateHttpService extends BaseHttpService {
  constructor(
    protected readonly httpClient: HttpClient,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
  }

  /**
   * List default start dates and end date for date params
   */
  defaultDatesParams(subdomain: string): Observable<DefaultDate[]> {
    const url = this.buildUrl(
      `company/company-date-parameter/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<DefaultDate[]>>(url), [
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }
}
