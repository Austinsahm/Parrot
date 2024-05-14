import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CompanyListReportFormComponent } from "./company-list-report-form/company-list-report-form.component";
import { CompanyLocationReportFormComponent } from "./company-location-report-form/company-location-report-form.component";
import { CompanyListSummaryReportFormComponent } from "./company-list-summary-report-form/company-list-summary-report-form.component";
import { CompanyBillingReportFormComponent } from "./company-billing-report-form/company-billing-report-form.component";
import { ReportFormatFieldComponent } from "./report-format-field/report-format-field.component";
import { CommonWidgetsModule } from "../common-widgets/common-widgets.module";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { CompanyWidgetsModule } from "../company-widgets/company-widgets.module";
import { LocationWidgetsModule } from "../location-widgets/location-widgets.module";
import { DeviceMessageReportFormComponent } from "./device-message-report-form/device-message-report-form.component";
import { DeviceSummaryReportFormComponent } from "./device-summary-report-form/device-summary-report-form.component";
import { DeviceListReportFormComponent } from "./device-list-report-form/device-list-report-form.component";
import { ReportHeaderComponent } from "./report-header/report-header.component";
import { DeviceListReportViewerComponent } from "./device-list-report-viewer/device-list-report-viewer.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ReportViewerComponent } from "./report-viewer/report-viewer.component";
import { CompanyListReportViewerComponent } from "./company-list-report-viewer/company-list-report-viewer.component";
import { CompanyLocationReportViewerComponent } from "./company-location-report-viewer/company-location-report-viewer.component";
import { CompanySummaryReportViewerComponent } from "./company-summary-report-viewer/company-summary-report-viewer.component";
import { CompanyBillingReportViewerComponent } from "./company-billing-report-viewer/company-billing-report-viewer.component";
import { DeviceSummaryReportViewerComponent } from "./device-summary-report-viewer/device-summary-report-viewer.component";
import { DeviceMessagesReportViewerComponent } from "./device-messages-report-viewer/device-messages-report-viewer.component";
import { CorporateDeviceListReportFormComponent } from "./corporate-device-list-report-form/corporate-device-list-report-form.component";
import { DeviceWidgetsModule } from "../device-widgets/device-widgets.module";
import { CorporateDeviceListReportViewerComponent } from "./corporate-device-list-report-viewer/corporate-device-list-report-viewer.component";
import { CorporateDeviceListSummaryReportViewerComponent } from "./corporate-device-list-summary-report-viewer/corporate-device-list-summary-report-viewer.component";
import { CorporateDeviceMessageReportViewerComponent } from "./corporate-device-message-report-viewer/corporate-device-message-report-viewer.component";
import { CorporateDeviceMessageReportFormComponent } from "./corporate-device-message-report-form/corporate-device-message-report-form.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ReportActionsComponent } from "./report-actions/report-actions.component";
import { DeviceReportFormComponent } from "./device-report-form/device-report-form.component";
import { DeviceReportViewerComponent } from "./device-report-viewer/device-report-viewer.component";
import { DashboardWidgetsModule } from "../dashboard-widgets/dashboard-widgets.module";
import { PartnerDeviceReportFormComponent } from "./partner-device-report-form/partner-device-report-form.component";
import { BillingPaymentFormComponent } from './billing-payment-form/billing-payment-form.component';

@NgModule({
  declarations: [
    CompanyListReportFormComponent,
    CompanyLocationReportFormComponent,
    CompanyListSummaryReportFormComponent,
    CompanyBillingReportFormComponent,
    ReportFormatFieldComponent,
    DeviceMessageReportFormComponent,
    DeviceSummaryReportFormComponent,
    DeviceListReportFormComponent,
    ReportHeaderComponent,
    DeviceListReportViewerComponent,
    ReportViewerComponent,
    CompanyListReportViewerComponent,
    CompanyLocationReportViewerComponent,
    CompanySummaryReportViewerComponent,
    CompanyBillingReportViewerComponent,
    DeviceSummaryReportViewerComponent,
    DeviceMessagesReportViewerComponent,
    CorporateDeviceListReportFormComponent,
    CorporateDeviceListReportViewerComponent,
    CorporateDeviceListSummaryReportViewerComponent,
    CorporateDeviceMessageReportViewerComponent,
    CorporateDeviceMessageReportFormComponent,
    ReportActionsComponent,
    DeviceReportFormComponent,
    DeviceReportViewerComponent,
    PartnerDeviceReportFormComponent,
    BillingPaymentFormComponent,
  ],
  imports: [
    CommonModule,
    CommonWidgetsModule,
    CompanyWidgetsModule,
    LocationWidgetsModule,
    NgbDatepickerModule,
    NgxDatatableModule,
    DeviceWidgetsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    DashboardWidgetsModule,
  ],
  exports: [
    CompanyListReportFormComponent,
    CompanyLocationReportFormComponent,
    CompanyListSummaryReportFormComponent,
    CompanyBillingReportFormComponent,
    ReportFormatFieldComponent,
    DeviceMessageReportFormComponent,
    DeviceSummaryReportFormComponent,
    ReportHeaderComponent,
    DeviceListReportViewerComponent,
    DeviceListReportFormComponent,
    ReportViewerComponent,
    CompanyListReportViewerComponent,
    CompanyLocationReportViewerComponent,
    CompanySummaryReportViewerComponent,
    CompanyBillingReportViewerComponent,
    DeviceSummaryReportViewerComponent,
    DeviceMessagesReportViewerComponent,
    LocationWidgetsModule,
    CorporateDeviceListReportFormComponent,
    CorporateDeviceListReportViewerComponent,
    CorporateDeviceListSummaryReportViewerComponent,
    CorporateDeviceMessageReportViewerComponent,
    CorporateDeviceMessageReportFormComponent,
    ReportActionsComponent,
    DeviceReportFormComponent,
    DeviceReportViewerComponent,
    PartnerDeviceReportFormComponent,
    BillingPaymentFormComponent
  ],
})
export class ReportWidgetModule {}
