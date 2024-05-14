import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { CompanyInfoResolverService } from "./services/company-info-resolver.service";
import { LandingComponent } from "./landing/landing.component";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./error-pages/not-found/not-found.component";
import { CorporateGuard } from "./services/corporate.guard";
import { AuthGuard } from "./services/auth.guard";
import { PartnerGuard } from "./services/partner.guard";
import { BackOfficeGuard } from "./services/back-office.guard";
import { IndexComponent } from "./index/index.component";
import { PartnerPageComponent } from "./partner-page/partner-page.component";
import { UtilityPageComponent } from "./modules/utility/utility-page/utility-page.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: "",
    resolve: { companyInitData: CompanyInfoResolverService },
    component: IndexComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "landing",
        component: LandingComponent,
        canActivate: [PartnerGuard],
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
      },
      {
        path: "**",
        redirectTo: "page-not-found",
      },
    ],
  },
  {
    path: "partner",
    component: PartnerPageComponent,
    children: [
      { path: "", redirectTo: "landing", pathMatch: "full" },
      {
        path: "landing",
        component: LandingComponent,
        canActivate: [PartnerGuard],
      },
      {
        path: "company-management",
        loadChildren: () =>
          import("./modules/company-management/company-management.module").then(
            (module) => module.CompanyManagementModule
          ),
        canActivate: [PartnerGuard],
        canLoad: [PartnerGuard],
        canActivateChild: [PartnerGuard],
      },
      {
        path: "company-billing",
        loadChildren: () =>
          import("./modules/billing/billing.module").then(
            (module) => module.BillingModule
          ),
        canActivate: [PartnerGuard],
        canLoad: [PartnerGuard],
        canActivateChild: [PartnerGuard],
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./modules/reports/reports.module").then(
            (module) => module.ReportsModule
          ),
        canActivate: [PartnerGuard],
        canLoad: [PartnerGuard],
        canActivateChild: [PartnerGuard],
      },
      {
        path: "utility",
        loadChildren: () =>
          import("./modules/utility/utility.module").then(
            (module) => module.UtilityModule
          ),
        canActivate: [PartnerGuard],
        canLoad: [PartnerGuard],
        canActivateChild: [PartnerGuard],
      },
      {
        path: "security",
        loadChildren: () =>
          import("./modules/partner-security/partner-security.module").then(
            (module) => module.PartnerSecurityModule
          ),
        canActivate: [PartnerGuard],
        canLoad: [PartnerGuard],
        canActivateChild: [PartnerGuard],
      },
      {
        path: "device-management",
        loadChildren: () =>
          import("./modules/device-management/device-management.module").then(
            (module) => module.DeviceManagementModule
          ),
        canActivate: [PartnerGuard],
        canLoad: [PartnerGuard],
        canActivateChild: [PartnerGuard],
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "corporate",
    loadChildren: () =>
      import("./modules/corporate/corporate.module").then(
        (module) => module.CorporateModule
      ),
    // canLoad: [CorporateGuard],
    // canActivateChild: [CorporateGuard],
    canActivate: [CorporateGuard],
  },
  {
    path: "back-office",
    loadChildren: () =>
      import("./modules/back-office/back-office.module").then(
        (module) => module.BackOfficeModule
      ),
    canLoad: [BackOfficeGuard],
    canActivateChild: [BackOfficeGuard],
    canActivate: [BackOfficeGuard],
  },
  {
    path: "page-not-found",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}