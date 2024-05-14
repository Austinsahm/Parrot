import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportHttpService } from './http/report-http.service';
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
  DeviceMessageReportFilter
} from './models/report.model';

@Injectable()
export class ReportDataAccessorService {

  constructor(
    private readonly backend: ReportHttpService
  ) { }

  /**
   * Generates a device list report for a given company
   * @param subdomain 
   * @param filter 
   */
  generateDeviceListReport(subdomain: string, filter: DeviceListReportFilter): Observable<DeviceListReportEntry[]> {    
    return this.backend.generateDeviceList(subdomain, filter);
  }

  /**
   * Generates a device summary report for a given company
   * @param subdomain 
   * @param filter 
   */
  generateDeviceSummaryReport(subdomain: string, filter: DeviceListSummaryReportFilter): Observable<DeviceListSummaryReportEntry[]> {
    return this.backend.generateDeviceSummary(subdomain, filter);
  }

  /**
   * Generates a device summary report for a given company
   * @param subdomain 
   * @param filter 
   */
  generateDeviceMessageReport(subdomain: string, filter: DeviceMessageReportFilter): Observable<DeviceMessageReportEntry[]> {
    return this.backend.generateDeviceMessages(subdomain, filter);
  }

   /**
   * Generates a device summary report for a given company
   * @param subdomain 
   * @param filter 
   */
  generateCoporateDeviceMessageReport(subdomain: string, filter: DeviceMessageReportFilter): Observable<DeviceMessageReportEntry[]> {
    return this.backend.generateCorporateDeviceMessages(subdomain, filter);
  }

  /**
   * Generates a company list report for a given company
   * @param subdomain 
   * @param filter 
   */
  generateCompanyListReport(subdomain: string, filter: CompanyListReportFilter): Observable<CompanyListReportEntry[]> {
    return this.backend.generateCompanyList(subdomain, filter);
  }

  /**
   * Generates a company list by location reports for a given company
   * @param subdomain 
   * @param filter 
   */
  generateCompanyByLocationReport(subdomain: string, filter: CompanyLocationReportFilter): Observable<CompanyLocationReportEntry[]> {
    return this.backend.generateCompanyLocation(subdomain, filter);
  }

  /**
   * Generates a company summary report for a given company
   * @param subdomain 
   * @param filter 
   */
  generateCompanySummaryReport(subdomain: string, filter: CompanySummaryReportFilter): Observable<CompanySummaryReportEntry[]> {
    return this.backend.generateCompanySummary(subdomain, filter);
  }

  /**
  * Generates a company billing report for a given company
  * @param subdomain 
  * @param filter 
  */
  generateCompanyBillingReport(subdomain: string, filter: CompanyBillingReportFilter): Observable<CompanyBillingReportEntry[]> {
    return this.backend.generateCompanyBilling(subdomain, filter);
  }
}
