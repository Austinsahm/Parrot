import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CompanyListReportComponent } from './company-list-report/company-list-report.component';
import { CompanyLocationReportComponent } from './company-location-report/company-location-report.component';
import { CompanySummaryReportComponent } from './company-summary-report/company-summary-report.component';
import { CompanyBillingReportComponent } from './company-billing-report/company-billing-report.component';
import { DeviceListReportComponent } from './device-list-report/device-list-report.component';
import { DeviceSummaryReportComponent } from './device-summary-report/device-summary-report.component';
import { DeviceMessgeReportComponent } from './device-messge-report/device-messge-report.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportWidgetModule } from 'src/app/widgets/report-widget/report-widget.module';
import { PartnerDeviceReportComponent } from './partner-device-report/partner-device-report.component';


@NgModule({
  declarations: [
    CompanyListReportComponent,
    CompanyLocationReportComponent,
    CompanySummaryReportComponent,
    CompanyBillingReportComponent,
    DeviceListReportComponent,
    DeviceSummaryReportComponent,
    DeviceMessgeReportComponent,
    ReportsComponent,
    PartnerDeviceReportComponent
  ],
  imports: [
    CommonModule,
    ReportWidgetModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
