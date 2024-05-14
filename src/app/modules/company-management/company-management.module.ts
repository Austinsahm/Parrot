import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { CompanyManagementRoutingModule } from "./company-management-routing.module";
import { CompanyListComponent } from "./company-list/company-list.component";
import { CompanyManagementComponent } from "./company-management/company-management.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { HttpClientModule } from "@angular/common/http";
import { CompanyService } from "./company.service";
import { CompanyNewComponent } from "./company-new/company-new.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { CompanyLocationNewComponent } from "./company-location-new/company-location-new.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { CompanyLocationDetailComponent } from "./company-location-detail/company-location-detail.component";
import { AssetsListComponent } from "./assets-list/assets-list.component";
import { AssetsNewComponent } from "./assets-new/assets-new.component";
import { AssetsDetailComponent } from "./assets-detail/assets-detail.component";
import { DataAccessModule } from "src/app/data-access/data-access.module";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { LocationWidgetsModule } from "src/app/widgets/location-widgets/location-widgets.module";
import { CompanyWidgetsModule } from "src/app/widgets/company-widgets/company-widgets.module";
import { CompanyContactFormComponent } from "./company-contact-form/company-contact-form.component";
import { CompanyContactCreateModalComponent } from "./company-contact-create-modal/company-contact-create-modal.component";
import { CompanyContactUpdateModalComponent } from "./company-contact-update-modal/company-contact-update-modal.component";
import { WhiteLabelsComponent } from "./white-labels/white-labels.component";
import { WhiteLabelListComponent } from "./white-label-list/white-label-list.component";
import { WhiteLabelDetailsModalComponent } from "./white-label-details-modal/white-label-details-modal.component";
import { SummaryListComponent } from "./summary-list/summary-list.component";
import { SummaryDetailComponent } from "./summary-detail/summary-detail.component";
import { SummaryDetailViewComponent } from "./summary-detail-view/summary-detail-view.component";
import { ChartsWidgetsModule } from "src/app/widgets/charts-widgets/charts-widgets.module";
import { UserSummaryDetailComponent } from "./user-summary-detail/user-summary-detail.component";
import { AssetSummaryDetailComponent } from "./asset-summary-detail/asset-summary-detail.component";
import { LocationSummaryDetailComponent } from "./location-summary-detail/location-summary-detail.component";
import { DeviceSummaryDetailComponent } from "./device-summary-detail/device-summary-detail.component";
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import {
  faListUl,
  faList,
  faMapMarkerAlt,
  faChartPie,
  faChartLine,
  faTachometerAlt,
  faMapMarkedAlt,
  faExpandArrowsAlt,
  faExpand,
  faWindowMinimize,
  faBell,
  faToggleOn,
  faToggleOff,
  faWifi,
  faBatteryFull,
  faBatteryThreeQuarters,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryEmpty,
  faSignal,
  faAtom,
  faDoorOpen,
  faDoorClosed,
  faBolt,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import { CommonWidgetsModule } from "src/app/widgets/common-widgets/common-widgets.module";
import { NgxLoadersCssModule } from "ngx-loaders-css";
import { DeviceWidgetsModule } from "src/app/widgets/device-widgets/device-widgets.module";
import { DashboardWidgetsModule } from "src/app/widgets/dashboard-widgets/dashboard-widgets.module";
import { MatIconModule } from "@angular/material/icon";
import { CompanyParametersListComponent } from "./company-parameters-list/company-parameters-list.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { DeviceSummaryDetailsSettingsComponent } from "./device-summary-details-settings/device-summary-details-settings.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { DeviceSummaryDataDetailComponent } from "./device-summary-data-detail/device-summary-data-detail.component";
import { CompanyOrganogramComponent } from "./company-organogram/company-organogram.component";
import { TreeModule } from "primeng/tree";
import { TooltipModule } from "primeng/tooltip";
import { CompanyListTableFormatComponent } from "./company-list-table-format/company-list-table-format.component";
import { CompanyVerticalOrganogramComponent } from "./company-vertical-organogram/company-vertical-organogram.component";
import { OrganizationChartModule } from "primeng/organizationchart";
import { CompanyBillingFormComponent } from "./company-billing-form/company-billing-form.component";
import { CompanyBillingListComponent } from "./company-billing-list/company-billing-list.component";
import { CompanyBillingComponent } from "./company-billing/company-billing.component";
import { DeviceUseCaseComponent } from "./device-use-case/device-use-case.component";
import { Angular4PaystackModule } from "angular4-paystack";
import { PartnerBillingFormComponent } from "./partner-billing-form/partner-billing-form.component";
import { environment } from "src/environments/environment";
import { ReportWidgetModule } from "src/app/widgets/report-widget/report-widget.module";
import { BillingFormComponent } from "./billing-form/billing-form.component";

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyManagementComponent,
    CompanyNewComponent,
    CompanyDetailComponent,
    CompanyLocationNewComponent,
    CompanyLocationDetailComponent,
    AssetsListComponent,
    AssetsNewComponent,
    AssetsDetailComponent,
    CompanyContactFormComponent,
    CompanyContactCreateModalComponent,
    CompanyContactUpdateModalComponent,
    WhiteLabelsComponent,
    WhiteLabelListComponent,
    WhiteLabelDetailsModalComponent,
    SummaryListComponent,
    SummaryDetailComponent,
    SummaryDetailViewComponent,
    UserSummaryDetailComponent,
    AssetSummaryDetailComponent,
    LocationSummaryDetailComponent,
    DeviceSummaryDetailComponent,
    CompanyParametersListComponent,
    DeviceSummaryDetailsSettingsComponent,
    DeviceSummaryDataDetailComponent,
    CompanyOrganogramComponent,
    CompanyListTableFormatComponent,
    CompanyVerticalOrganogramComponent,
    CompanyBillingFormComponent,
    CompanyBillingListComponent,
    CompanyBillingComponent,
    DeviceUseCaseComponent,
    PartnerBillingFormComponent,
    BillingFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpClientModule,
    NgbModalModule,
    CompanyManagementRoutingModule,
    NgxSkeletonLoaderModule,
    DataAccessModule,
    LocationWidgetsModule,
    CompanyWidgetsModule,
    NgbTooltipModule,
    ChartsWidgetsModule,
    NgbModule,
    FontAwesomeModule,
    CommonWidgetsModule,
    NgxLoadersCssModule,
    DeviceWidgetsModule,
    DashboardWidgetsModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TreeModule,
    TooltipModule,
    OrganizationChartModule,
    ReportWidgetModule,
    Angular4PaystackModule.forRoot(environment.paystackKey),
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [CompanyService],
})
export class CompanyManagementModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faListUl,
      faList,
      faMapMarkerAlt,
      faChartPie,
      faChartLine,
      faTachometerAlt,
      faMapMarkedAlt,
      faExpandArrowsAlt,
      faExpand,
      faWindowMinimize,
      faBell,
      faToggleOn,
      faToggleOff,
      faWifi,
      faBatteryFull,
      faBatteryThreeQuarters,
      faBatteryHalf,
      faBatteryQuarter,
      faBatteryEmpty,
      faSignal,
      faAtom,
      faDoorClosed,
      faDoorOpen,
      faBolt,
      faTemperatureHigh
    );
  }
}
