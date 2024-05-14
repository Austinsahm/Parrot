import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BillingHttpService } from "src/app/data-access/http/billing-http.service";
import { BillsData } from "src/app/data-access/models/bill.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";

@Component({
  selector: "app-billing-calculator",
  templateUrl: "./billing-calculator.component.html",
  styleUrls: ["./billing-calculator.component.scss"],
})
export class BillingCalculatorComponent implements OnInit {
  clientType: ComboBoxOption<string>[] = [
    { key: "return", value: "No", label: "No" },
    { key: "new", value: "Yes", label: "Yes" },
  ];

  currency$: Observable<ComboBoxOption<string>[]>;
  showValue = false;

  formData = this.formBuilder.group({
    devices: [200, [Validators.required, Validators.pattern(/^[1-9]\d{0,2}$/)]],
    subscrYears: [1, [Validators.required, Validators.pattern(/^[12]$/)]],
    messages: [0],
    user: [1, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    phoneCall: 0,
    valCurrency: ["", Validators.required],
    clientStatus: ["", Validators.required],
    result: "",
    platformFees: "",
    resultMonth: "",
  });

  formBgColor: string;
  formFontColor: string;
  formFont: string;

  constructor(
    private billingService: BillingHttpService,
    private formBuilder: FormBuilder,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.currency$ = this.billingService.getCurrency().pipe(
      map((curr) => {
        this.formData.patchValue({ valCurrency: curr[1].currencyId });
        this.formData.patchValue({ clientStatus: this.clientType[0].key });
        this.getData();
        return curr.map((el) => {
          return {
            key: el.currencyId,
            value: el.currencyId,
            label: el.currencyId,
          };
        });
      })
    );
  }

  submit() {
    this.showValue = true;
    this.getData();
  }

  currencySelectionChange(el: MatSelectChange) {
    this.formData.patchValue({
      valCurrency: el.value,
    });
  }

  statusSelectionChange(el: MatSelectChange) {
    this.formData.patchValue({
      clientStatus: el.value,
    });
  }

  private getData() {
    const val = this.formData.value;
    this.billingService
      .getBillingParameters(val.devices, val.subscrYears, val.valCurrency)
      .subscribe(
        (res) => {
          this.formData.patchValue({
            platformFees: res.platformAccessFee,
          });

          this.valData(val, res);
        },
        () => {
          // this.toastService.error("data not gotten");
        }
      );
  }

  private valData(formVal, resData: BillsData) {
    const {
      devVolumeDiscnt,
      contrDuratnDiscnt,
      devicePrice,
      smsPrice,
      dollarRate,
      phonCallPrice,
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

    let sub = subPrice / (formVal.subscrYears * 12);
    const monthlySub = sub.toFixed(2);

    this.formData.patchValue({
      result: subPrice,
      resultMonth: monthlySub,
    });
  }
}
