import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReportsComponent } from "./reports/reports.component";
import { DeviceHistoryReportComponent } from "./device-history-report/device-history-report.component";
import { AssetListReportComponent } from "./asset-list-report/asset-list-report.component";
import { DeviceListReportComponent } from "./device-list-report/device-list-report.component";
import { DeviceSummaryReportComponent } from "./device-summary-report/device-summary-report.component";
import { DeviceMessageReportComponent } from "./device-message-report/device-message-report.component";
import { DeviceMessageSummaryReportComponent } from "./device-message-summary-report/device-message-summary-report.component";
import { BillingReportComponent } from "./billing-report/billing-report.component";
import { DeviceReportComponent } from "./device-report/device-report.component";

const routes: Routes = [
  {
    path: "",
    component: ReportsComponent,
    children: [
      {
        path: "",
        redirectTo: "device-history",
        pathMatch: "full",
      },
      {
        path: "device-history",
        component: DeviceHistoryReportComponent,
      },
      {
        path: "asset-list",
        component: AssetListReportComponent,
      },
      {
        path: "device-list",
        component: DeviceListReportComponent,
      },
      {
        path: "device-list-summary",
        component: DeviceSummaryReportComponent,
      },
      {
        path: "device-messages",
        component: DeviceMessageReportComponent,
      },
      {
        path: "device-messages-summary",
        component: DeviceMessageSummaryReportComponent,
      },
      {
        path: "billing",
        component: BillingReportComponent,
      },
      {
        path: "device-report",
        component: DeviceReportComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class CorporateReportRoutingModule {}
