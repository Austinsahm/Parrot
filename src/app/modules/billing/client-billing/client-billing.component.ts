import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { CorporateEventMonitoringHttpService } from "src/app/data-access/http/corporate-event-monitoring-http.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ToastrService } from "ngx-toastr";
import { BillingHttpService } from "src/app/data-access/http/billing-http.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";
import { MatSelectChange } from "@angular/material/select";
import { Observable } from "rxjs";
import { map, concatMap } from "rxjs/operators";

import { BillingPaymentService } from "src/app/services/billing-payment.service";
import { yearsPerPage } from "@angular/material/datepicker";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { BillsData } from "src/app/data-access/models/bill.model";

@Component({
  selector: "app-client-billing",
  templateUrl: "./client-billing.component.html",
  styleUrls: ["./client-billing.component.scss"],
})
export class ClientBillingComponent implements OnInit {
  editMode: boolean = false;
  // subdomain: string;

  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  companyId: string;
  companyName: string;
  notifyForm: FormGroup;
  displayCount: string;

  payOptions: ComboBoxOption<string>[] = [
    { key: "Bulk Payment", value: "Bulk Payment", label: "Bulk Payment" },
    {
      key: "Installment Payment",
      value: "Installment Payment",
      label: " Installment Payment",
    },
  ];

  billingMethods: ComboBoxOption<string>[] = [
    {
      key: "subscription",
      label: "Subscription based",
      value: "Subscription based",
    },
    { key: "usage", label: "Usage based", value: "Usage based" },
  ];

  billingModes: ComboBoxOption<string>[] = [
    { key: "draft", label: "Draft", value: "Draft" },
    { key: "final", label: "Final", value: "Final" },
  ];

  clientType: ComboBoxOption<string>[] = [
    { key: "return", value: "No", label: "No" },
    { key: "new", value: "Yes", label: "Yes" },
  ];

  currency$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private billingService: BillingHttpService,
    // private billPay: BillingPaymentService,
    private readonly companyInfoService: CompanyInfoService,
    private router: Router,
    // private readonly alertService: CorporateEventMonitoringHttpService,
    private readonly route: ActivatedRoute,
    private errMsg: ErrorMessageService
  ) {
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

    this.notifyForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      companyId: ["", Validators.required],
      year: [1, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      deviceQty: ["", Validators.required],
      clientBillId: ["", Validators.required],
      planId: ["", Validators.required],
      billingMode: ["", Validators.required],
      subscrStartDate: ["", Validators.required],
      subscrEndDate: ["", Validators.required],
      billCreateDate: ["", Validators.required],
      clientMode: ["", Validators.required],
      paymentCount: ["", Validators.required],
      totalBills: ["", Validators.required],
      outstandingBills: ["", Validators.required],
      currentBills: ["", Validators.required],
      phoneCall: [0],
      messages: [0],
      user: [1, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      planName: ["", Validators.required],
      planCode: ["", Validators.required],
      clientStatus: ["", Validators.required],
      payMode: ["", Validators.required],
      billingMethod: ["", Validators.required],
      valCurrency: ["NGN", Validators.required],
      vat: [50],
      tax: [5],
    });
  }

  ngOnInit(): void {
    this.loadParams();

    // this.billingService.companyDeviceCount(this.companyId).subscribe(
    //   (res) => {
    //     this.tsr = res.deviceCount;
    //   },
    //   () => {
    //     // this.errMsg.errorExist("No Internet connectivity");
    //   }
    // );

    this.currency$ = this.billingService.getCurrency().pipe(
      concatMap((curr) => {
        return this.billingService.companyDeviceCount(this.companyId).pipe(
          concatMap((device) => {
            return this.billingService.companyCount(this.companyId).pipe(
              concatMap((num) => {
                return this.billingService
                  .billingData(
                    device.deviceCount,
                    this.notifyForm.get("year").value
                  )
                  .pipe(
                    map((plan) => {
                      if (num.companyCount == 0) {
                        this.displayCount = "No";
                      } else {
                        this.displayCount = "Yes";
                      }
                      this.notifyForm.patchValue({
                        valCurrency: curr[1].currencyId,
                        billingMethod: this.billingMethods[0].key,
                        clientStatus: this.clientType[1].key,
                        billingMode: this.billingModes[0].key,
                        deviceQty: device.deviceCount,
                        planId: plan.planId,
                        planName: plan.planName,
                        planCode: plan.planCode,
                        platformAccessFee: plan.platformAccessFee,
                      });
                      return curr.map((el) => {
                        return {
                          key: el.currencyId,
                          value: el.currencyId,
                          label: el.currencyId,
                        };
                      });
                    })
                  );
              })
            );
            // this.getData();
          })
        );
      })
      // map((curr) => {

      // })
    );
  }

  loadParams() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.companyName = param.get("companyName").trim();
      this.companyId = param.get("subdomain");
      // console.log(param)
    });
  }

  // private getData() {
  //   this.billingService.companyCount(this.companyId).subscribe(
  //     (res) => {
  //       this.count = res.companyCount;

  //       if (this.count == 0) {
  //         this.displayCount = "No";
  //       } else {
  //         this.displayCount = "Yes";
  //       }

  //       return this.displayCount;
  //     },
  //     () => {
  //       // this.errMsg.errorExist("No Internet connectivity");
  //     }
  //   );

  //   this.billingService
  //     .billingData(
  //       this.notifyForm.get("deviceQty").value,
  //       this.notifyForm.get("year").value
  //     )
  //     .subscribe(
  //       (res) => {
  //         this.notifyForm.patchValue({
  //           planId: res.planId,
  //           planName: res.planName,
  //           planCode: res.planCode,
  //           platformAccessFee: res.platformAccessFee,
  //         });
  //       },

  //       () => {
  //         // this.errMsg.errorExist("No Internet connectivity");
  //       }
  //     );

  //   const val = this.notifyForm.value;
  //   this.billingService
  //     .getBillingParameters(val.deviceQty, val.year, val.valCurrency)
  //     .subscribe(
  //       (res) => {
  //         this.notifyForm.patchValue({
  //           platformFees: res.platformAccessFee,
  //         });

  //         // this.valData(val, res);
  //       },
  //       () => {
  //         // this.errMsg.errorExist("No Internet connectivity");
  //       }
  //     );
  // }

  private npm(formVal, resData: BillsData) {
    const {
      devVolumeDiscnt,
      contrDuratnDiscnt,
      devicePrice,
      smsPrice,
      dollarRate,
      phonCallPrice,
      platformAccessFee,
    } = resData;

    const total_discount = +devVolumeDiscnt + +contrDuratnDiscnt;

    const finalUnitPrice = +devicePrice - +devicePrice * total_discount;

    const smsTotPrice = +formVal.messages * +formVal.user * +smsPrice;

    const phoneCallPrice = +formVal.phoneCall * +formVal.user * +phonCallPrice;

    let subPrice;
    subPrice = (
      (+formVal.devices * finalUnitPrice +
        smsTotPrice +
        phoneCallPrice * +dollarRate) **
      +formVal.subscrYears
    ).toFixed(2);

    let total = +platformAccessFee + subPrice;
    let sub = subPrice / (formVal.year * 12);
    const monthlySub = sub.toFixed(2);

    let finalTotalBill1 = total + formVal.vat * total;
    let finalTotalBill2 = subPrice + formVal.vat * subPrice;

    let finalTotalBill3 = subPrice / formVal.year + formVal.tax;
    // console.log(finalTotalBill3)

    if (formVal.clientStatus == "No") {
      this.notifyForm.patchValue({
        totalBills: finalTotalBill1,
      });
    } else {
      this.notifyForm.patchValue({
        totalBills: finalTotalBill2,
      });
    }

    if (formVal.payMode == "Bulk Payment") {
      this.notifyForm.patchValue({
        outstandingBills: finalTotalBill1,
        currentBills: finalTotalBill1,
        paymentCount: formVal.year,
      });
    } else {
      this.notifyForm.patchValue({
        outstandingBills: finalTotalBill1,
      });
    }

    if (formVal.paymentCount == 0) {
      this.notifyForm.patchValue({
        currentBills: finalTotalBill3,
      });
    } else {
      this.notifyForm.patchValue({
        currentBills: formVal.currentBills,
      });
    }
  }

  billSelectionChange(el: MatSelectChange) {
    this.notifyForm.patchValue({
      billingMethod: el.value,
    });
    // console.log(this.billingMethod);
  }

  modeSelectionChange(el: MatSelectChange) {
    this.notifyForm.patchValue({
      billingMode: el.value,
    });
  }

  paySelectionChange(el: MatSelectChange) {
    this.notifyForm.patchValue({
      payMode: el.value,
    });
    // console.log(this.notifyForm.get("payMode").value);
  }

  statusSelectionChange(el: MatSelectChange) {
    this.notifyForm.patchValue({
      clientStatus: el.value,
    });
  }

  currencySelectionChange(el: MatSelectChange) {
    this.notifyForm.patchValue({
      valCurrency: el.value,
    });
  }

  cancel() {
    // this.editMode = false;
    this.router.navigate(["../../../../billing-list"], {
      relativeTo: this.route,
    });
  }

  submit() {
    console.log(this.notifyForm.value);
  }

  draft() {
    //  send form data to server
    // set billmode status to  draft

    this.notifyForm.patchValue({
      // billingMode: "Draft",
      companyName: this.companyName,
      companyId: this.companyId,
      subscrStartDate: new Date().toString(),
      billCreateDate: Date.now().toString(),
      // currentBills:"totalBills",
      // subscrEndDate: res.deviceEndDate,
    });
  }

  final() {
    // this.getData();
    console.log(this.notifyForm.value);

    // send form data to server
    // set billmode status to  final
    // set db draft to empty
  }
}
