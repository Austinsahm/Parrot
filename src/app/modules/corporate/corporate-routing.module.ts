import { NgModule } from "@angular/core";
import { flush } from "@angular/core/testing";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "src/app/error-pages/not-found/not-found.component";
import { CorporateGuard } from "src/app/services/corporate.guard";
import { CorporateAssetCreateComponent } from "./corporate-asset-create/corporate-asset-create.component";
import { CorporateAssetDetailComponent } from "./corporate-asset-detail/corporate-asset-detail.component";
import { CorporateAssetLandingComponent } from "./corporate-asset-landing/corporate-asset-landing.component";
import { CorporateAssetListComponent } from "./corporate-asset-list/corporate-asset-list.component";
import { CorporateAssetComponent } from "./corporate-asset/corporate-asset.component";
import { CorporateBulkDeviceLoadComponent } from "./corporate-bulk-device-load/corporate-bulk-device-load.component";
import { CorporateAssetTrackerComponent } from "./corporate-dashboard/corporate-asset-tracker/corporate-asset-tracker.component";
import { CorporateDashboardDirectoryComponent } from "./corporate-dashboard/corporate-dashboard-directory/corporate-dashboard-directory.component";
import { CorporateDashboardNewComponent } from "./corporate-dashboard/corporate-dashboard-new/corporate-dashboard-new.component";
import { CorporateDashboardUpdateComponent } from "./corporate-dashboard/corporate-dashboard-update/corporate-dashboard-update.component";
import { CorporateDashboardComponent } from "./corporate-dashboard/corporate-dashboard.component";
import { CorporateMapGeolocationUpdateComponent } from "./corporate-dashboard/corporate-map-geolocation-update/corporate-map-geolocation-update.component";
import { CorporateMapGeolocationComponent } from "./corporate-dashboard/corporate-map-geolocation/corporate-map-geolocation.component";
import { CorporateViewDashboardComponent } from "./corporate-dashboard/corporate-view-dashboard/corporate-view-dashboard.component";
import { CorporateViewGeolocationComponent } from "./corporate-dashboard/corporate-view-geolocation/corporate-view-geolocation.component";
import { CorporateDeviceAlertNotficationComponent } from "./corporate-device-alert-notfication/corporate-device-alert-notfication.component";
import { CorporateDeviceCategoryMatchComponent } from "./corporate-device-category-match/corporate-device-category-match.component";
import { CorporateDeviceConfigurationUpdateComponent } from "./corporate-device-configuration-update/corporate-device-configuration-update.component";
import { CorporateDeviceConfigurationComponent } from "./corporate-device-configuration/corporate-device-configuration.component";
import { CorporateDeviceLandingComponent } from "./corporate-device-landing/corporate-device-landing.component";
import { CorporateEventMonitoringComponent } from "./corporate-event-monitoring/corporate-event-monitoring.component";
import { CorporateGeofencingAlertComponent } from "./corporate-geofencing-alert/corporate-geofencing-alert.component";
import { CorporateLandingComponent } from "./corporate-landing/corporate-landing.component";
import { CorporateLocationCreateComponent } from "./corporate-location-create/corporate-location-create.component";
import { CorporateLocationDetailComponent } from "./corporate-location-detail/corporate-location-detail.component";
import { CorporateLocationLandingComponent } from "./corporate-location-landing/corporate-location-landing.component";
import { CorporateLocationListComponent } from "./corporate-location-list/corporate-location-list.component";
import { CorporateLocationComponent } from "./corporate-location/corporate-location.component";
import { CorporatePageComponent } from "./corporate-page/corporate-page.component";
import { CorporatePasswordChangeComponent } from "./corporate-password-change/corporate-password-change.component";
import { CorporateRoleAuthorizationComponent } from "./corporate-role-authorization/corporate-role-authorization.component";
import { CorporateSecurityComponent } from "./corporate-security/corporate-security.component";
import { CorporateSetupComponent } from "./corporate-setup/corporate-setup.component";
import { CorporateUserDeviceAccessComponent } from "./corporate-user-device-access/corporate-user-device-access.component";
import { CorporateUserGroupDetailsComponent } from "./corporate-user-group-details/corporate-user-group-details.component";
import { CorporateUserGroupsComponent } from "./corporate-user-groups/corporate-user-groups.component";
import { CorporateUserLandingComponent } from "./corporate-user-landing/corporate-user-landing.component";
import { CorporateUserListComponent } from "./corporate-user-list/corporate-user-list.component";
import { CorporateUserUpdateComponent } from "./corporate-user-update/corporate-user-update.component";
import { CorporateUtilityComponent } from "./corporate-utility/corporate-utility.component";
import { CorporateWhiteLabelComponent } from "./corporate-white-label/corporate-white-label.component";
import { CompanyParametersComponent } from "./company-parameters/company-parameters.component";
import { CorporateGeofencingComponent } from "./corporate-geofencing/corporate-geofencing.component";
import { CorporateDeviceUsecaseComponent } from "./corporate-device-usecase/corporate-device-usecase.component";
import { CorporateInvoicePaymentComponent } from "./corporate-invoice-payment/corporate-invoice-payment.component";
import { CorporateBillingComponent } from "./corporate-billing/corporate-billing.component";
import { CorpoarateBillingPageComponent } from "./corpoarate-billing-page/corpoarate-billing-page.component";
import { CorporateSmartHomeComponent } from "./corporate-smart-home/corporate-smart-home.component";
import { CorporateSmartHomePageComponent } from "./corporate-smart-home-page/corporate-smart-home-page.component";
import { CorporateSmartHomeDevicesComponent } from "./corporate-smart-home-devices/corporate-smart-home-devices.component";
import { CorporateFloorPlanDesignComponent } from "./corporate-floor-plan-design/corporate-floor-plan-design.component";
import { CorporateFloorPlanDesignPageComponent } from "./corporate-floor-plan-design-page/corporate-floor-plan-design-page.component";
import { CorporateFloorDeviceAssignmentComponent } from "./corporate-floor-device-assignment/corporate-floor-device-assignment.component";
import { CorporateTankLevelComponent } from "./corporate-tank-level/corporate-tank-level.component";

const routes: Routes = [
  {
    path: "",
    component: CorporatePageComponent,
    canActivateChild: [CorporateGuard],
    children: [
      {
        path: "",
        redirectTo: "corporate-landing",
        pathMatch: "full",
      },
      {
        path: "corporate-landing",
        component: CorporateLandingComponent,
      },
      {
        path: "use-cases",
        component: CorporateDeviceUsecaseComponent,
      },
      {
        path: "user-landing",
        component: CorporateUserLandingComponent,
      },
      {
        path: "asset-landing",
        component: CorporateAssetLandingComponent,
      },
      {
        path: "location-landing",
        component: CorporateLocationLandingComponent,
      },
      {
        path: "devices/:id",
        component: CorporateDeviceLandingComponent,
      },
      {
        path: "dashboards",
        component: CorporateDashboardComponent,
        children: [
          {
            path: "",
            redirectTo: "dashboard",
            pathMatch: "full",
          },
          // {
          //   path: "dashboard",
          //   children: [
          //     {
          //       path: "",
          //       redirectTo: "dashboard-directory",
          //       pathMatch: "full",
          //     },
          //     {
          //       path: "dashboard-directory",
          //       component: CorporateDashboardDirectoryComponent,
          //     },
          //     {
          //       path: "dashboard-new",
          //       component: CorporateDashboardNewComponent,
          //     },
          //     {
          //       path: "dashboard-update/:dashboardId",
          //       component: CorporateDashboardUpdateComponent,
          //     },
          //   ],
          // },
          // {
          //   path: "map-geolocation",
          //   children: [
          //     {
          //       path: "",
          //       component: CorporateMapGeolocationComponent,
          //     },
          //     {
          //       path: "map-geolocation-update/:dashboardId",
          //       component: CorporateMapGeolocationUpdateComponent,
          //     },
          //   ],
          // },
          // {
          //   path: "view-dashboard",
          //   component: CorporateViewDashboardComponent,
          // },
          // {
          //   path: "view-geolocation",
          //   component: CorporateViewGeolocationComponent,
          // },
          // {
          //   path: "asset-tracker",
          //   component: CorporateAssetTrackerComponent,
          // },
          {
            path: "geofencing",
            component: CorporateGeofencingComponent,
          },
          {
            path: "smarthome",
            component: CorporateSmartHomePageComponent,
            children: [
              { path: "", component: CorporateSmartHomeComponent },
              {
                path: ":assetId/devices",
                component: CorporateSmartHomeDevicesComponent,
              },
            ],
          },
          {
            path: "oil-gas",
            component: CorporateTankLevelComponent,
          },
          // {
          //   path: "Billing",
          //   component: CorporateBillingComponent,
          // },
        ],
      },
      {
        path: "events",
        component: CorporateEventMonitoringComponent,
        children: [
          {
            path: "",
            redirectTo: "device-alert-notification",
            pathMatch: "full",
          },
          {
            path: "device-alert-notification",
            component: CorporateDeviceAlertNotficationComponent,
          },
        ],
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./corporate-report/corporate-report.module").then(
            (module) => module.CorporateReportModule
          ),
      },
      {
        path: "security",
        component: CorporateSecurityComponent,
        children: [
          {
            path: "",
            redirectTo: "users",
            pathMatch: "full",
          },
          {
            path: "users",
            component: CorporateUserListComponent,
          },
          {
            path: "users/:user/update",
            component: CorporateUserUpdateComponent,
          },
          {
            path: "user-groups",
            component: CorporateUserGroupsComponent,
          },
          {
            path: "user-groups/:group/details",
            component: CorporateUserGroupDetailsComponent,
          },
          {
            path: "change-password",
            component: CorporatePasswordChangeComponent,
          },
          {
            path: "user-device-access",
            component: CorporateUserDeviceAccessComponent,
          },
          {
            path: "role-authorization",
            component: CorporateRoleAuthorizationComponent,
          },
          {
            path: "invoice-payment",
            component: CorporateInvoicePaymentComponent,
          },
        ],
      },
      {
        path: "billing",
        component: CorpoarateBillingPageComponent,
        children: [
          { path: "", redirectTo: "payment", pathMatch: "full" },
          { path: "payment", component: CorporateBillingComponent },
        ],
      },
      {
        path: "utility",
        component: CorporateUtilityComponent,
        children: [
          {
            path: "",
            redirectTo: "bulk-device-upload",
            pathMatch: "full",
          },
          {
            path: "bulk-device-upload",
            component: CorporateBulkDeviceLoadComponent,
          },
          {
            path: "device-category-match",
            component: CorporateDeviceCategoryMatchComponent,
          },
        ],
      },
      {
        path: "setup",
        component: CorporateSetupComponent,
        children: [
          {
            path: "",
            redirectTo: "location",
            pathMatch: "full",
          },
          {
            path: "device-config",
            component: CorporateDeviceConfigurationComponent,
          },
          {
            path: "device-config/:config/update",
            component: CorporateDeviceConfigurationUpdateComponent,
          },
          {
            path: "assets",
            component: CorporateAssetComponent,
            children: [
              {
                path: "",
                component: CorporateAssetListComponent,
              },
              {
                path: ":asset/details",
                component: CorporateAssetDetailComponent,
              },
              {
                path: "new",
                component: CorporateAssetCreateComponent,
              },
            ],
          },
          {
            path: "location",
            component: CorporateLocationComponent,
            children: [
              {
                path: "",
                component: CorporateLocationListComponent,
              },
              {
                path: ":locationId/details",
                component: CorporateLocationDetailComponent,
              },
              {
                path: "create",
                component: CorporateLocationCreateComponent,
              },
            ],
          },
          {
            path: "white-label-configuration",
            component: CorporateWhiteLabelComponent,
          },
          {
            path: "company-parameters",
            component: CompanyParametersComponent,
          },
          {
            path: "floor-plan-design",
            component: CorporateFloorPlanDesignPageComponent,
            children: [
              {
                path: "",
                component: CorporateFloorPlanDesignComponent,
              },
              {
                path: ":assetId/floor-plan",
                component: CorporateFloorDeviceAssignmentComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporateRoutingModule {}
