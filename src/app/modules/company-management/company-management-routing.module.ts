import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyManagementComponent } from "./company-management/company-management.component";
import { CompanyListComponent } from "./company-list/company-list.component";
import { CompanyNewComponent } from "./company-new/company-new.component";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { WhiteLabelsComponent } from "./white-labels/white-labels.component";
import { WhiteLabelListComponent } from "./white-label-list/white-label-list.component";
import { SummaryListComponent } from "./summary-list/summary-list.component";
import { SummaryDetailComponent } from "./summary-detail/summary-detail.component";
import { SummaryDetailViewComponent } from "./summary-detail-view/summary-detail-view.component";

import { UserSummaryDetailComponent } from "./user-summary-detail/user-summary-detail.component";
import { AssetSummaryDetailComponent } from "./asset-summary-detail/asset-summary-detail.component";
import { LocationSummaryDetailComponent } from "./location-summary-detail/location-summary-detail.component";
import { DeviceSummaryDetailComponent } from "./device-summary-detail/device-summary-detail.component";
import { PartnerCompanyParametersComponent } from "../partner-security/partner-company-parameters/partner-company-parameters.component";
import { CompanyParametersListComponent } from "./company-parameters-list/company-parameters-list.component";
import { CompanyBillingFormComponent } from "./company-billing-form/company-billing-form.component";
import { CompanyBillingListComponent } from "./company-billing-list/company-billing-list.component";
// import { Ass{etsListComponent } from './assets-list/assets-list.component';
import { DeviceUseCaseComponent } from "./device-use-case/device-use-case.component";
import { PartnerBillingFormComponent } from "./partner-billing-form/partner-billing-form.component";
// import { AssetsListComponent } from './assets-list/assets-list.component';
// import { AssetsNewComponent } from './assets-new/assets-new.component';
// import { AssetsDetailComponent } from './assets-detail/assets-detail.component';
import {BillingFormComponent} from './billing-form/billing-form.component';

const routes: Routes = [
  {
    path: "",
    component: CompanyManagementComponent,
    children: [
      {
        path: "",
        redirectTo: "company",
        pathMatch: "full",
      },
      {
        path: "company",
        children: [
          {
            path: "",
            redirectTo: "company-list",
            pathMatch: "full",
          },
          {
            path: "company-list",
            component: CompanyListComponent,
          },
          {
            path: "company-new",
            component: CompanyNewComponent,
          },
          {
            path: "company-detail/:id",
            component: CompanyDetailComponent,
          },
        ],
      },
      {
        path: "summary",
        children: [
          {
            path: "",
            redirectTo: "summary-list",
            pathMatch: "full",
          },
          {
            path: "summary-list",
            component: SummaryListComponent,
          },
          {
            path: "summary-detail/:companyId",
            component: SummaryDetailComponent,
            children: [
              {
                path: "details",
                component: SummaryDetailViewComponent,
              },
              {
                path: "users",
                component: UserSummaryDetailComponent,
              },
              {
                path: "assets",
                component: AssetSummaryDetailComponent,
              },
              {
                path: "locations",
                component: LocationSummaryDetailComponent,
              },
              // {
              //   path: "devices",
              //   component: DeviceSummaryDetailComponent,
              // },
              {
                path: "use-cases",
                component: DeviceUseCaseComponent,
              },
              {
                path: "devices/:id",
                component: DeviceSummaryDetailComponent,
              },
            ],
          },
          
        ],
      },
      {
        path: "company-parameters",
        children: [
          {
            path: "",
            redirectTo: "company-parameters-list",
            pathMatch: "full",
          },
          {
            path: "company-parameters-list",
            component: CompanyParametersListComponent,
          },
          {
            path: "company-parameters-details/:subdomain/company/:companyName",
            component: PartnerCompanyParametersComponent,
          },
        ],
      },
      {
        path: "white-label",
        component: WhiteLabelsComponent,
        children: [
          {
            path: "",
            redirectTo: "white-label-list",
            pathMatch: "full",
          },
          {
            path: "white-label-list",
            component: WhiteLabelListComponent,
          },
        ],
      },
      
      {
        path: "company-billing",
        children: [
          {
            path: "",
            redirectTo: "company-billing-list",
            pathMatch: "full",
          },
          {
            path: "company-billing-list",
            component: CompanyBillingListComponent,
          },
          {
            path:"billing",
            component: BillingFormComponent,
          },
          {
            path: "company-billing-form/:subdomain/company/:companyName",
            component: CompanyBillingFormComponent,
          },

          // {
          //   path: "company-billing-form/:subdomain/company/:companyName",
          //   component: CompanyBillingFormComponent,
          // },
          // {
          //   path: "company-billing-form/:subdomain/company/:companyName",
          //   component: PartnerBillingFormComponent,
          // },
        ],
      },
      /* {
        path: 'assets',
        children: [
          {
            path: '',
            redirectTo: 'assets-list',
            pathMatch: 'full'
          },
          {
            path: 'assets-list',
            component: AssetsListComponent,
          },
          {
            path: 'assets-new',
            component: AssetsNewComponent
          },
          {
            path: 'assets-detail/:id',
            component: AssetsDetailComponent,
          },
        ]
      }, */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyManagementRoutingModule {}
