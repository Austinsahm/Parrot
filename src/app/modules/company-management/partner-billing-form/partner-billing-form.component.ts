import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaystackData } from "src/app/data-access/models/company.model";
import { BillingPaymentService } from "src/app/services/billing-payment.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-partner-billing-form",
  templateUrl: "./partner-billing-form.component.html",
  styleUrls: ["./partner-billing-form.component.scss"],
})
export class PartnerBillingFormComponent implements OnInit {
  reloadGen = false;
  key = environment.paystackKey;
  companyId: string;
  userId: string;
  email: string;
  amount: string;
  companyName: string;

  constructor(
    private billingService: BillingPaymentService,
    private userInfoService: UserInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get("subdomain");
    this.companyName = this.route.snapshot.paramMap.get("companyName");
    this.userId = this.userInfoService.getUserInfo().userId;
    
  }

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
