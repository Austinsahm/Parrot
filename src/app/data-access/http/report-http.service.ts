import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import { Response, StatusCode } from "../models/http.model";
import {
  CompanyBillingReportEntry,
  CompanyBillingReportFilter,
  CompanyListReportEntry,
  CompanyListReportFilter,
  CompanyLocationReportEntry,
  CompanyLocationReportFilter,
  CompanySummaryReportEntry,
  CompanySummaryReportFilter,
  DeviceListReportEntry,
  DeviceListReportFilter,
  DeviceListSummaryReportEntry,
  DeviceListSummaryReportFilter,
  DeviceMessageReportEntry,
  DeviceMessageReportFilter,
} from "../models/report.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable()
export class ReportHttpService extends BaseHttpService {
  userId: string;

  constructor(
    protected readonly httpClient: HttpClient,
    private userInfoService: UserInfoService,    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
  }

  /**
   * Generates reports on device lists
   */
  generateDeviceList(
    subdomain: string,
    filter: DeviceListReportFilter,
    userId?: string
  ): Observable<DeviceListReportEntry[]> {
    const url = this.buildUrl(
      `reports/device-list/startCompanyId/${filter.fromCompany}/stopCompanyId/${filter.toCompany}/parentCompanyId/${subdomain}/startCreatedDate/${filter.from}/stopCreatedDate/${filter.to}/status/${filter.statusId}/userId/${this.userId}/networkId/${filter.networkId}`
    );
    return this.check(
      this.httpClient.get<Response<DeviceListReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  /**
   * Generates reports on device lists summary
   */
  generateDeviceSummary(
    subdomain: string,
    filter: DeviceListSummaryReportFilter,
    userId?: string
  ): Observable<DeviceListSummaryReportEntry[]> {
    const url = this.buildUrl(
      `reports/device-list-summary/startCompanyId/${filter.fromCompany}/stopCompanyId/${filter.toCompany}/parentCompanyId/${subdomain}/startCreatedDate/${filter.from}/stopCreatedDate/${filter.to}/status/${filter.statusId}/userId/${this.userId}`
    );
    return this.check(
      this.httpClient.get<Response<DeviceListSummaryReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  generateDeviceMessages(
    subdomain: string,
    filter: DeviceMessageReportFilter,
    userId?: string
  ): Observable<DeviceMessageReportEntry[]> {
    const url = this.buildUrl(
      `reports/device-message-partner/startCompanyId/${filter.fromCompany}/stopCompanyId/${filter.toCompany}/parentCompanyId/${subdomain}/startMsgDate/${filter.from}/stopMsgDate/${filter.to}/status/${filter.statusId}/userId/${this.userId}`
    );
    return this.check(
      this.httpClient.get<Response<DeviceMessageReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  generateCorporateDeviceMessages(
    subdomain: string,
    filter: DeviceMessageReportFilter
  ): Observable<DeviceMessageReportEntry[]> {
    const url = this.buildUrl(
      `reports/device-message-corporate/startCompanyId/${filter.fromCompany}/stopCompanyId/${filter.toCompany}/companyId/${subdomain}/startMsgDate/${filter.from}/stopMsgDate/${filter.to}/status/${filter.statusId}`
    );
    return this.check(
      this.httpClient.get<Response<DeviceMessageReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  /**
   * Generates reports on company lists
   */
  generateCompanyList(
    subdomain: string,
    filter: CompanyListReportFilter
  ): Observable<CompanyListReportEntry[]> {
    const url = this.buildUrl(
      `reports/company-list/startCreatedDate/${filter.from}/stopCreatedDate/${filter.to}/status/${filter.statusId}/companyType/${filter.typeId}/parentCompanyId/${subdomain}`
    );
    return this.check(
      this.httpClient.get<Response<CompanyListReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  /**
   * Generates reports on lists by location
   */
  generateCompanyLocation(
    subdomain: string,
    filter: CompanyLocationReportFilter
  ): Observable<CompanyLocationReportEntry[]> {
    const url = this.buildUrl(
      `reports/company-list-by-location/startCreatedDate/${filter.from}/stopCreatedDate/${filter.to}/startStateId/${filter.fromState}/stopStateId/${filter.toState}/startCityId/${filter.fromCity}/stopCityId/${filter.toCity}/companyType/${filter.typeId}/status/${filter.statusId}/parentCompanyId/${subdomain}`
    );
    return this.check(
      this.httpClient.get<Response<CompanyLocationReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  /**
   * Generates reports on company lists summary
   */
  generateCompanySummary(
    subdomain: string,
    filter: CompanySummaryReportFilter
  ): Observable<CompanySummaryReportEntry[]> {
    const url = this.buildUrl(
      `reports/company-list-summary/startCreatedDate/${filter.from}/stopCreatedDate/${filter.to}/status/${filter.statusId}/companyType/${filter.typeId}/parentCompanyId/${subdomain}`
    );
    return this.check(
      this.httpClient.get<Response<CompanySummaryReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  /**
   * Generates reports on company billing report
   */
  generateCompanyBilling(
    subdomain: string,
    filter: CompanyBillingReportFilter
  ): Observable<CompanyBillingReportEntry[]> {
    const url = this.buildUrl(
      `reports/billing-report-partner/startCompanyId/${filter.fromCompany}/stopCompanyId/${filter.toCompany}/parentCompanyId/${subdomain}/startMsgDate/${filter.from}/stopMsgDate/${filter.to}/status/${filter.statusId}`
    );
    return this.check(
      this.httpClient.get<Response<CompanyBillingReportEntry[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }
}
