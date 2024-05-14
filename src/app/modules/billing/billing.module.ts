import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingPageComponent } from './billing-page/billing-page.component';
import { BillingCalculatorComponent } from './billing-calculator/billing-calculator.component';
import { CommonWidgetsModule } from 'src/app/widgets/common-widgets/common-widgets.module';
import { ClientBillingComponent } from './client-billing/client-billing.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    BillingPageComponent,
    BillingCalculatorComponent,
    ClientBillingComponent,
    BillingListComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    BillingRoutingModule, 
    CommonWidgetsModule
  ]
})
export class BillingModule { }
