import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BillingCalculatorComponent } from "./billing-calculator/billing-calculator.component";
import { BillingPageComponent } from "./billing-page/billing-page.component";
import { ClientBillingComponent } from "./client-billing/client-billing.component";
import { BillingListComponent } from "./billing-list/billing-list.component";

const routes: Routes = [
  {
    path: "",
    component: BillingPageComponent,
    children: [
      {
        path: "",
        redirectTo: "calculator",
        pathMatch: "full",
      },
      {
        path: "calculator",
        component: BillingCalculatorComponent,
      },
      {
        path: "billing-list",
        component: BillingListComponent,
      },
      // {
      //   path: "clientBills",
      //   component: ClientBillingComponent,
      // },
      {
        path: "client-bill/:subdomain/company/:companyName",
        component: ClientBillingComponent,
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule {}
