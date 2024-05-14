import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { DeviceHistoryReportComponent } from './device-history-report/device-history-report.component';
import { CorporateReportRoutingModule } from './corporate-report-routing.module';
import { AssetListReportComponent } from './asset-list-report/asset-list-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbTooltipModule, NgbTimepickerModule, NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from 'src/app/widgets/layout/layout.module';
import { DeviceListReportComponent } from './device-list-report/device-list-report.component';
//import { CorporateDeviceListReportFormComponent } from 'src/app/widgets/report-widget/corporate-device-list-report-form/corporate-device-list-report-form.component';
import { ReportWidgetModule } from 'src/app/widgets/report-widget/report-widget.module';
import { DeviceSummaryReportComponent } from './device-summary-report/device-summary-report.component';
import { DeviceMessageReportComponent } from './device-message-report/device-message-report.component';
import { DeviceMessageSummaryReportComponent } from './device-message-summary-report/device-message-summary-report.component';
import { BillingReportComponent } from './billing-report/billing-report.component';
import { LocationWidgetsModule } from 'src/app/widgets/location-widgets/location-widgets.module';
import { DeviceReportComponent } from './device-report/device-report.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    ReportsComponent,
    DeviceHistoryReportComponent, 
    AssetListReportComponent, 
    DeviceListReportComponent,
    DeviceSummaryReportComponent, 
    DeviceMessageReportComponent, 
    DeviceMessageSummaryReportComponent, 
    BillingReportComponent, 
    DeviceReportComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NgbTooltipModule,
    NgxDatatableModule,
    CorporateReportRoutingModule,
    NgbTimepickerModule,
    NgbAccordionModule,
    NgbModule,
    ReportWidgetModule,
    LocationWidgetsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports:[
    NgbTimepickerModule
  ]
})
export class CorporateReportModule { }
