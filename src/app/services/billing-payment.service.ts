import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import {
  CompanyBilling,
  PaystackData,
} from "../data-access/models/company.model";
import { environment } from "../../environments/environment";
import { BaseHttpService } from "../data-access/http/base-http.service";
import { ErrorMessageService } from "./error-message.service";
import { Response } from "../data-access/models/http.model";

@Injectable({
  providedIn: "root",
})
export class BillingPaymentService extends BaseHttpService {
  paymentHandler: any = null;
  apiEndpoint: string;

  constructor(
    protected readonly http: HttpClient,
    private toastrService: ToastrService,
    protected errMsg: ErrorMessageService
  ) {
    super(http, errMsg);
    this.invokeStripe();
  }

  //this is handled for stripe reserved for reference purporse
  makePayment(amount: number, billingData: Partial<CompanyBilling>) {
    const url = this.buildUrl(`update-credit-balance`);
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: environment.stripeKey,
      locale: "auto",

      token: (token: { id: string }) => {
        this.checkWrite(
          this.http.post<Response<any>>(url, {
            companyId: billingData.companyId,
            amount: amount * 100,
            tokenId: token.id,
            // companyAddress: BillingData.companyAddress,
          })
        ).subscribe({
          error: (err) => {
            this.toastrService.error("ugh! error here");
          },
          next: (res: any) => {
            this.toastrService.success("Payment Successful");
          },
        });
      },
    });
    console.log(billingData.companyAddress);

    paymentHandler.open({
      name: billingData.companyName,
      description: billingData.companyId,
      amount: amount * 100,
      // email: BillingData.companyEmail,
      // address:BillingData.companyAddress,      type: 'card'
    });
  }

  makePaymentPaystack(data: PaystackData) {
    const url = this.buildUrl(`update-credit-balance`);
    this.checkWrite(this.http.post<Response<any>>(url, data)).subscribe({
      error: (err) => {
        this.toastrService.error("ugh! error here");
      },
      next: (res: any) => {
        this.toastrService.success("Payment Successful");
      },
    });
  }

  private invokeStripe() {
    if (!window.document.getElementById("stripe-script")) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      // script.onload = () => {
      //   this.paymentHandler = (<any>window).StripeCheckout.configure({
      //     key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
      //     locale: 'auto',
      //     token: function (stripeToken: any, ) {

      //       console.log(stripeToken);
      //       alert('Payment has been successfull!');
      //     }
      //   });
      // };
      window.document.body.appendChild(script);
    }
  }
}
