import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CorporateEventMonitoringHttpService } from "src/app/data-access/http/corporate-event-monitoring-http.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ToastrService } from "ngx-toastr";
import { BillingHttpService } from "src/app/data-access/http/billing-http.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";
import { MatSelectChange } from "@angular/material/select";
import { BillingPaymentService } from "src/app/services/billing-payment.service";

@Component({
  selector: "app-company-billing-form",
  templateUrl: "./company-billing-form.component.html",
  styleUrls: ["./company-billing-form.component.scss"],
})
export class CompanyBillingFormComponent implements OnInit {
  editMode: boolean = false;
  subdomain: string;
  companyId: string;
  companyName: string;
  notifyForm: FormGroup;
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  value: string;
  valueItem: string;

  // "deviceQty": number;
  year: number;
  count: number;
  displayCount: string;

  planName: string;
  planCode: string;
  devicePrice: number;
  platformAccessFee: number;
  deviceNumber: number;
  subscrYear: number;
  deviceVolDis: number;
  ctrlDuraDis: number;

  currency: string;
  billingMethod: "subscription";
  payOption: string;

  email: string;
  address: string;

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

  currencies: ComboBoxOption<string>[] = [
    { key: "NGN", value: "NGN", label: "NGN" },
    { key: "USD", value: "USD", label: "USD" },
  ];
  tsr: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private billingService: BillingHttpService,
    private billPay: BillingPaymentService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly alertService: CorporateEventMonitoringHttpService,
    private readonly route: ActivatedRoute
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

    this.notifyForm = this.formBuilder.group({
      companyName: [""],
      companyId: [this.subdomain],
      messages: 0,
      user: 1,
      phoneCall: 0,
      year: "",
      deviceQty: "",
    });
  }

  ngOnInit(): void {
    this.loadParams();
    this.billingService.companyDeviceCount(this.companyId).subscribe((res) => {
      this.tsr = res.deviceCount;
      this.getData();
    },
    () => {
          // this.toastService.error("data not gotten");
        });
  }

  loadParams() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.companyName = param.get("companyName");
      this.companyId = param.get("subdomain");
      // console.log(param)
    });
  }

  getData() {
    this.notifyForm.patchValue({ year: 1, deviceQty: this.tsr });
    // this.billingService.companyDeviceCount(this.companyId).subscribe(
    //   (res) => {
    //       this.notifyForm.patchValue({deviceQty: res.deviceCount});
    //   },
    //   () => {
    //     this.toastService.error("data not gotten");
    //   }
    // );

    this.billingService.companyCount(this.companyId).subscribe(
      (res) => {
        this.count = res.companyCount;

        if (this.count == 0) {
          this.displayCount = "No";
        } else {
          this.displayCount = "Yes";
        }

        return this.displayCount;
      },
      () => {
        // this.toastService.error("data not gotten");
      }
    );

    this.billingService
      .billingData(
        this.notifyForm.get("deviceQty").value,
        this.notifyForm.get("year").value
      )
      .subscribe(
        (res) => {
          this.planName = res.planName;
          this.planCode = res.planCode;
          this.devicePrice = Number(res.devicePrice);
          this.platformAccessFee = res.platformAccessFee;
          this.deviceVolDis = Number(res.devVolumeDiscnt);
          this.ctrlDuraDis = Number(res.contrDuratnDiscnt);
        },

        () => {
          // this.toastService.error("");
        }
      );
  }

  billSelectionChange(el: MatSelectChange) {
    this.billingMethod = el.value;
    // console.log(this.billingMethod);
  }
  paySelectionChange(el: MatSelectChange) {
    this.payOption = el.value;
    this.subCal();
    // console.log(this.payOption);
  }
  currencySelectionChange(el: MatSelectChange) {
    this.currency = el.value;
    console.log(this.currency);
  }

  subCal() {
    // check for billing method default {subcription and bulk payment}

    console.log(this.billingMethod);
    console.log(this.payOption);
    // console.log(this.deviceQty);

    if (
      this.billingMethod == "subscription" &&
      this.payOption == "Bulk Payment"
    ) {
      var totalDiscount = this.deviceVolDis + this.ctrlDuraDis;

      var finalDevPrice = this.devicePrice - this.devicePrice * totalDiscount;

      // this.sub = this."deviceQty" * finalDevPrice;
      // console.log("the sub " + this.sub);
    }
    // return this.sub;

    // if (
    //   this.billingMethods[0].value == "Subscription based" &&
    //   this.payOptions[0].value == "Bulk Payment"
    // ) {
    //   var totalDiscount = this.deviceVolDis + this.ctrlDuraDis;

    //   var finalDevPrice = this.devicePrice - this.devicePrice * totalDiscount;

    //   this.sub = this."deviceQty" * finalDevPrice;
    //   console.log("the sub " + this.sub);
    // } else if (
    //   this.billingMethods[0].value == "Subscription based" &&
    //   this.payOptions[0].value == "Installment Payment"
    // ) {
    //   this.sub = this."deviceQty" * finalDevPrice;
    //   // sub  (set start date and expiry date} else {update start date and expiry date}
    //   // this.sub = this.sub / this.years[0].value;
    // } else if (this.count == 1) {
    //   //check for client type{ returning } or {new
    //   this.sub = this.platformAccessFee + this.sub;
    // } else {
    //   this.sub;
    // }
    // return this.sub;
  }

  edit() {
    this.editMode = true;
    // this.notifyForm.patchValue({ companyName: this.companyName });
  }

  //  edit() {
  //   this.editMode = true;
  //   let data = this.formData.value;;
  //     this.formData.patchValue({
  //       devices: data.devices,
  //       subscrYears: data.subscrYears,
  //       messages: data.messages,
  //       user: data.user,
  //       phoneCall: data.phoneCall,
  //       valCurrency: data.valCurrency,
  //       clientStatus: data.clientStatus,
  //       result: data.result,
  //       platformFees: data.platformFees,
  //       resultMonth: data.resultMonth,
  //     });
  //   console.log(this.formData.value);
  // }

  cancel() {
    this.editMode = false;
  }

  paymentCancel() {
    console.log("close App");
  }
  paymentDone(event: any) {
    console.log("submit data", event);
  }
}
