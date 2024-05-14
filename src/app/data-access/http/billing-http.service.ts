import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StatusCode, Response } from "../models/http.model";
import { Bills, BillsData, CurrencyData, } from "../models/bill.model";
import { BaseHttpService } from "./base-http.service";
import { Observable } from "rxjs";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable({
  providedIn: "root",
})
export class BillingHttpService extends BaseHttpService {
  constructor(
    protected readonly httpClient: HttpClient,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
  }

  companyDeviceCount(companyId: string): Observable<{ deviceCount: number }> {
    const url = this.buildUrl(`device/company-device-count/${companyId}`);
    return this.check(
      this.httpClient.get<Response<{ deviceCount: number }>>(url),
      [StatusCode.OK]
    );
  }

  companyCount(companyId: string): Observable<{ companyCount: number }> {
    const url = this.buildUrl(`billing/count/company-id/${companyId}`);
    return this.check(
      this.httpClient.get<Response<{ companyCount: number }>>(url),
      [StatusCode.OK]
    );
  }

  billingData(deviceNumber: number, subscrYear: number): Observable<Bills> {
    const url = this.buildUrl(
      `billing/billing-plan/device-number/${deviceNumber}/subscr-year/${subscrYear}`
    );
    return this.check(this.httpClient.get<Response<Bills>>(url), [
      StatusCode.OK,
    ]);
  }

  getBillingParameters(
    deviceCount: number,
    subscrYear: number,
    curId: string
  ): Observable<BillsData> {
    const url = this.buildUrl(
      `billing/billing-data/device-count/${deviceCount}/subscr-years/${subscrYear}/currency-id/${curId}`
    );

    return this.check(this.httpClient.get<Response<BillsData>>(url), [
      StatusCode.OK,
    ]);
  }

  getCurrency(): Observable<CurrencyData[]> {
    const url = this.buildUrl(`billing/currencies`);

    return this.check(this.httpClient.get<Response<CurrencyData[]>>(url), [
      StatusCode.OK,
    ]);
  }
}
