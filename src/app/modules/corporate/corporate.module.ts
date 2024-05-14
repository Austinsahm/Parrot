import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CorporateRoutingModule } from "./corporate-routing.module";
import { CorporateDashboardComponent } from "./corporate-dashboard/corporate-dashboard.component";
import { CorporateEventMonitoringComponent } from "./corporate-event-monitoring/corporate-event-monitoring.component";
import { CorporateSecurityComponent } from "./corporate-security/corporate-security.component";
import { CorporateSetupComponent } from "./corporate-setup/corporate-setup.component";
import { CorporatePageComponent } from "./corporate-page/corporate-page.component";
import { CorporateDeviceConfigurationComponent } from "./corporate-device-configuration/corporate-device-configuration.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NgbModule,
  NgbTimepickerModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DeviceWidgetsModule } from "src/app/widgets/device-widgets/device-widgets.module";
import { CorporateDeviceConfigurationUpdateComponent } from "./corporate-device-configuration-update/corporate-device-configuration-update.component";
import { CorporateUserListComponent } from "./corporate-user-list/corporate-user-list.component";
import { CorporateUserDetailViewComponent } from "./corporate-user-detail-view/corporate-user-detail-view.component";
import { CorporateUserDetailFormComponent } from "./corporate-user-detail-form/corporate-user-detail-form.component";
import { CorporateUserUpdateComponent } from "./corporate-user-update/corporate-user-update.component";
import { UserGroupModalComponent } from "./user-group-modal/user-group-modal.component";
import { UserWidgetsModule } from "src/app/widgets/user-widgets/user-widgets.module";
import { CorporateUserGroupsComponent } from "./corporate-user-groups/corporate-user-groups.component";
import { CorporateUserGroupDetailsComponent } from "./corporate-user-group-details/corporate-user-group-details.component";
import { CorporateDeviceReportComponent } from "./corporate-device-report/corporate-device-report.component";
import { CorporateCompanyReportComponent } from "./corporate-company-report/corporate-company-report.component";
import { CorporateAssetReportComponent } from "./corporate-asset-report/corporate-asset-report.component";
import { ReportWidgetModule } from "src/app/widgets/report-widget/report-widget.module";
import { CorporateCompanyLocationReportComponent } from "./corporate-company-location-report/corporate-company-location-report.component";
import { CorporateCompanySummaryReportComponent } from "./corporate-company-summary-report/corporate-company-summary-report.component";
import { CorporateCompanyBillingReportComponent } from "./corporate-company-billing-report/corporate-company-billing-report.component";
import { CorporateDeviceSummaryReportComponent } from "./corporate-device-summary-report/corporate-device-summary-report.component";
import { CorporateDeviceMessageReportComponent } from "./corporate-device-message-report/corporate-device-message-report.component";
import { CorporateAssetComponent } from "./corporate-asset/corporate-asset.component";
import { CorporateAssetDetailComponent } from "./corporate-asset-detail/corporate-asset-detail.component";
import { CorporateAssetListComponent } from "./corporate-asset-list/corporate-asset-list.component";
import { CorporateAssetCreateComponent } from "./corporate-asset-create/corporate-asset-create.component";
import { CorporatePasswordChangeComponent } from "./corporate-password-change/corporate-password-change.component";
import { LayoutModule } from "src/app/widgets/layout/layout.module";
import { CorporateLocationComponent } from "./corporate-location/corporate-location.component";
import { CorporateLocationListComponent } from "./corporate-location-list/corporate-location-list.component";
import { CorporateLocationCreateComponent } from "./corporate-location-create/corporate-location-create.component";
import { CorporateLocationDetailComponent } from "./corporate-location-detail/corporate-location-detail.component";
import { CorporateUtilityComponent } from "./corporate-utility/corporate-utility.component";
import { CorporateBulkDeviceLoadComponent } from "./corporate-bulk-device-load/corporate-bulk-device-load.component";
import { CorporateDashboardDirectoryComponent } from "./corporate-dashboard/corporate-dashboard-directory/corporate-dashboard-directory.component";
import { CorporateMapGeolocationComponent } from "./corporate-dashboard/corporate-map-geolocation/corporate-map-geolocation.component";
import { CorporateViewDashboardComponent } from "./corporate-dashboard/corporate-view-dashboard/corporate-view-dashboard.component";
import { CorporateViewGeolocationComponent } from "./corporate-dashboard/corporate-view-geolocation/corporate-view-geolocation.component";
import { CorporateAssetTrackerComponent } from "./corporate-dashboard/corporate-asset-tracker/corporate-asset-tracker.component";
import { CorporateDashboardNewComponent } from "./corporate-dashboard/corporate-dashboard-new/corporate-dashboard-new.component";
import { ChartsWidgetsModule } from "src/app/widgets/charts-widgets/charts-widgets.module";
import { DashboardWidgetsModule } from "src/app/widgets/dashboard-widgets/dashboard-widgets.module";
import { CommonWidgetsModule } from "src/app/widgets/common-widgets/common-widgets.module";
import { CorporateDashboardUpdateComponent } from "./corporate-dashboard/corporate-dashboard-update/corporate-dashboard-update.component";
import { CorporateDeviceCategoryMatchComponent } from "./corporate-device-category-match/corporate-device-category-match.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CorporateLandingComponent } from "./corporate-landing/corporate-landing.component";
import { CorporateUserLandingComponent } from "./corporate-user-landing/corporate-user-landing.component";
import { CorporateAssetLandingComponent } from "./corporate-asset-landing/corporate-asset-landing.component";
import { CorporateLocationLandingComponent } from "./corporate-location-landing/corporate-location-landing.component";
import { CorporateDeviceLandingComponent } from "./corporate-device-landing/corporate-device-landing.component";
import {
  FaIconLibrary,
  FontAwesomeModule,
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
import { CorporateUserDeviceAccessComponent } from "./corporate-user-device-access/corporate-user-device-access.component";
import { CorporateMapGeolocationUpdateComponent } from "./corporate-dashboard/corporate-map-geolocation-update/corporate-map-geolocation-update.component";
import { CorporateRoleAuthorizationComponent } from "./corporate-role-authorization/corporate-role-authorization.component";
import { CompanyWidgetsModule } from "src/app/widgets/company-widgets/company-widgets.module";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { CorporateGeofencingAlertComponent } from "./corporate-geofencing-alert/corporate-geofencing-alert.component";
import { CorporateWhiteLabelComponent } from "./corporate-white-label/corporate-white-label.component";
import { CorporateDeviceAlertNotficationComponent } from "./corporate-device-alert-notfication/corporate-device-alert-notfication.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { CompanyParametersComponent } from "./company-parameters/company-parameters.component";
import { NgxLoadersCssModule } from "ngx-loaders-css";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatMenuModule } from "@angular/material/menu";
import { CorporateLogsModalComponent } from "./corporate-logs-modal/corporate-logs-modal.component";
import { MatTabsModule } from "@angular/material/tabs";
import { CorporateGeofencingComponent } from "./corporate-geofencing/corporate-geofencing.component";
import { GeofencingModule } from "src/app/widgets/geofencing/geofencing.module";
import { CorporateDeviceUsecaseComponent } from "./corporate-device-usecase/corporate-device-usecase.component";
import { CorporateInvoicePaymentComponent } from "./corporate-invoice-payment/corporate-invoice-payment.component";
import { MatTableModule } from "@angular/material/table";
import { CorporateBillingComponent } from "./corporate-billing/corporate-billing.component";
import { Angular4PaystackModule } from "angular4-paystack";
import { environment } from "src/environments/environment";
import { CorpoarateBillingPageComponent } from "./corpoarate-billing-page/corpoarate-billing-page.component";
import { CorporateSmartHomeComponent } from "./corporate-smart-home/corporate-smart-home.component";
import { CorporateSmartHomeDevicesComponent } from "./corporate-smart-home-devices/corporate-smart-home-devices.component";
import { CorporateSmartHomePageComponent } from "./corporate-smart-home-page/corporate-smart-home-page.component";
import { CorporateFloorPlanComponent } from "./corporate-floor-plan/corporate-floor-plan.component";
import { CorporateFloorPlanDesignComponent } from "./corporate-floor-plan-design/corporate-floor-plan-design.component";
import { CorporateFloorPlanDesignPageComponent } from "./corporate-floor-plan-design-page/corporate-floor-plan-design-page.component";
import { CorporateFloorDeviceAssignmentComponent } from "./corporate-floor-device-assignment/corporate-floor-device-assignment.component";
import { CorporateTankLevelComponent } from "./corporate-tank-level/corporate-tank-level.component";

// Load FusionCharts
import * as FusionCharts from "fusioncharts";
// Load Charts module
import * as Widgets from "fusioncharts/fusioncharts.widgets";
// Load fusion theme
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { FusionChartsModule } from "angular-fusioncharts";
import { CorporateTankCardComponent } from "./corporate-tank-card/corporate-tank-card.component";
import { CorporateTankShapeComponent } from './corporate-tank-shape/corporate-tank-shape.component';
import { TankShapeCssComponent } from './tank-shape-css/tank-shape-css.component';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);

@NgModule({
  declarations: [
    CorporateDashboardComponent,
    CorporateEventMonitoringComponent,
    CorporateSecurityComponent,
    CorporateSetupComponent,
    CorporatePageComponent,
    CorporateDeviceConfigurationComponent,
    CorporateDeviceConfigurationUpdateComponent,
    CorporateUserListComponent,
    CorporateUserDetailViewComponent,
    CorporateUserDetailFormComponent,
    CorporateUserUpdateComponent,
    UserGroupModalComponent,
    CorporateUserGroupsComponent,
    CorporateUserGroupDetailsComponent,
    CorporateDeviceReportComponent,
    CorporateCompanyReportComponent,
    CorporateAssetReportComponent,
    CorporateCompanyLocationReportComponent,
    CorporateCompanySummaryReportComponent,
    CorporateCompanyBillingReportComponent,
    CorporateDeviceSummaryReportComponent,
    CorporateDeviceMessageReportComponent,
    CorporateAssetComponent,
    CorporateAssetDetailComponent,
    CorporateAssetListComponent,
    CorporateAssetCreateComponent,
    CorporatePasswordChangeComponent,
    CorporateLocationComponent,
    CorporateLocationListComponent,
    CorporateLocationCreateComponent,
    CorporateLocationDetailComponent,
    CorporateUtilityComponent,
    CorporateBulkDeviceLoadComponent,
    CorporateDashboardDirectoryComponent,
    CorporateMapGeolocationComponent,
    CorporateViewDashboardComponent,
    CorporateViewGeolocationComponent,
    CorporateAssetTrackerComponent,
    CorporateDashboardNewComponent,
    CorporateDashboardUpdateComponent,
    CorporateDeviceCategoryMatchComponent,
    CorporateLandingComponent,
    CorporateUserLandingComponent,
    CorporateAssetLandingComponent,
    CorporateLocationLandingComponent,
    CorporateDeviceLandingComponent,
    CorporateUserDeviceAccessComponent,
    CorporateMapGeolocationUpdateComponent,
    CorporateRoleAuthorizationComponent,
    CorporateGeofencingAlertComponent,
    CorporateWhiteLabelComponent,
    CorporateDeviceAlertNotficationComponent,
    CompanyParametersComponent,
    CorporateLogsModalComponent,
    CorporateGeofencingComponent,
    CorporateDeviceUsecaseComponent,
    CorporateInvoicePaymentComponent,
    CorporateBillingComponent,
    CorpoarateBillingPageComponent,
    CorporateSmartHomeComponent,
    CorporateSmartHomeDevicesComponent,
    CorporateSmartHomePageComponent,
    CorporateFloorPlanComponent,
    CorporateFloorPlanDesignComponent,
    CorporateFloorPlanDesignPageComponent,
    CorporateFloorDeviceAssignmentComponent,
    CorporateTankLevelComponent,
    CorporateTankCardComponent,
    CorporateTankShapeComponent,
    TankShapeCssComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    CorporateRoutingModule,
    NgbTooltipModule,
    NgxDatatableModule,
    DeviceWidgetsModule,
    UserWidgetsModule,
    ReportWidgetModule,
    NgbTimepickerModule,
    ChartsWidgetsModule,
    DashboardWidgetsModule,
    DragDropModule,
    NgbModule,
    FontAwesomeModule,
    CompanyWidgetsModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    CommonWidgetsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxLoadersCssModule,
    MatMomentDateModule,
    MatMenuModule,
    MatTabsModule,
    GeofencingModule,
    MatTableModule,
    Angular4PaystackModule.forRoot(environment.paystackKey),
    FusionChartsModule,
    MatSelectModule,
  ],
  // exports: [  ],
})
export class CorporateModule {
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
