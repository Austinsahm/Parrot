import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Observable, of } from "rxjs";
import { PaystackData } from "src/app/data-access/models/company.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { BillingPaymentService } from "src/app/services/billing-payment.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-corporate-billing",
  templateUrl: "./corporate-billing.component.html",
  styleUrls: ["./corporate-billing.component.scss"],
})
export class CorporateBillingComponent implements OnInit {
  reloadGen = false;
  key = environment.paystackKey;
  companyId: string;
  userId: string;
  email: string;
  amount: string;

  constructor(
    private billingService: BillingPaymentService,
    private userInfoService: UserInfoService,
    private companyInfoService: CompanyInfoService,
    private cd: ChangeDetectorRef
  ) {
    this.companyId = companyInfoService.getCompanyInfo().companyId;
    this.userId = userInfoService.getUserInfo().userId;
  }

  ngOnInit(): void {}

  paymentCancel() {
    this.reloadGen = false;
  }

  paymentDone(data: { status: string; transaction: string; trxref: string }) {
    this.reloadGen = false;
    if (data.status === "success") {
      const endpointData: PaystackData = {
        amount: +this.amount,
        companyId: this.companyId,
        userId: this.userId,
        date: new Date().toISOString(),
        emailAddress: this.email,
        transactionId: data.transaction,
        transactionRef: data.trxref,
      };
      this.billingService.makePaymentPaystack(endpointData);
    }
  }

  amountValidate(el: string): number {
    this.amount = el.substring(1).replace(",", "");
    if (!+this.amount) {
      const removeLast = this.amount.length;
      this.amount = this.amount.substring(0, removeLast - 1);
    }

    return +this.amount * 100;
  }
  paymentInit(form: any) {
    this.reloadGen = true;
    this.email = form.get("email").value;
    this.amount = form.get("amount").value.substring(1).replace(",", "");
  }
}
