import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyBillingReportComponent } from "./company-billing-report/company-billing-report.component";
import { CompanyListReportComponent } from "./company-list-report/company-list-report.component";
import { CompanyLocationReportComponent } from "./company-location-report/company-location-report.component";
import { CompanySummaryReportComponent } from "./company-summary-report/company-summary-report.component";
import { DeviceListReportComponent } from "./device-list-report/device-list-report.component";
import { DeviceMessgeReportComponent } from "./device-messge-report/device-messge-report.component";
import { DeviceSummaryReportComponent } from "./device-summary-report/device-summary-report.component";
import { PartnerDeviceReportComponent } from "./partner-device-report/partner-device-report.component";
import { ReportsComponent } from "./reports/reports.component";

const routes: Routes = [
  {
    path: "",
    component: ReportsComponent,
    children: [
      {
        path: "",
        redirectTo: "company-lists",
        pathMatch: "full",
      },
      {
        path: "device-lists",
        component: DeviceListReportComponent,
      },
      {
        path: "device-summaries",
        component: DeviceSummaryReportComponent,
      },
      {
        path: "device-messages",
        component: DeviceMessgeReportComponent,
      },
      {
        path: "company-lists",
        component: CompanyListReportComponent,
      },
      {
        path: "company-locations",
        component: CompanyLocationReportComponent,
      },
      {
        path: "company-summaries",
        component: CompanySummaryReportComponent,
      },
      {
        path: "company-billings",
        component: CompanyBillingReportComponent,
      },
      {
        path: "device",
        component: PartnerDeviceReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
