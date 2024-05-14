import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { BillingHttpService } from "src/app/data-access/http/billing-http.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";
import { MatSelectChange } from "@angular/material/select";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss']
})

export class BillingFormComponent implements OnInit {
  
  clientType:ComboBoxOption<string>[] = [
    { key: "return", value: "No", label: "No" },
    { key: "new", value: "Yes", label: "Yes" },
  ];

  currency$: Observable<ComboBoxOption<string>[]>;
  showValue = false;

  formData = this.formBuilder.group({
    devices: 200,
    subscrYears: 1,
    messages: 0,
    user: 1,
    phoneCall: 0,
    valCurrency: "",
    clientStatus: "",
    result: "",
    platformFees: "",
    resultMonth: "",
  });

  constructor(private formBuilder: FormBuilder,
    private billingService: BillingHttpService,
   ) { }

    
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

    submit(){
      this.showValue = true;
      this.getData();
    }

    // getData(){
    //   const val= this.formData.value;
    //    this.billingService
    //     .getBillingParameters(val.devices, val.subscrYears, val.valCurrency)
    //     .subscribe(
    //       (res) => {
    //         this.response = res.platformAccessFee;

    //         this.formData.patchValue({
    //           platformFees:this.response 
    //         })

    //         this.valData(val, res);
    //       },
    //       () => {
    //         this.toastService.error("data not gotten");
    //       }
    //     );
    //   };

    //   getCurr(){
    //     this.billingService.getCurrency().subscribe((data) => {
    //       this.currency= data; // issue connecting data to the currency combo box
    //       console.log(data)
    //     },
    //     () => {
    //       this.toastService.error("data not gotten");
    //     })

    //   }

     currencySelectionChange(el: MatSelectChange) {
      this.formData.patchValue({
        valCurrency: el.value,
      });
    }

    statusSelectionChange(el: MatSelectChange){
      this.formData.patchValue({
        clientStatus: el.value,
      })
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
  
    private valData(formVal, resData) {
      const total_discount =
        +resData.devVolumeDiscnt + +resData.contrDuratnDiscnt;
  
      const deviceUnitPrice = +resData.devicePrice;
      const finalUnitPrice = deviceUnitPrice - deviceUnitPrice * total_discount;
  
      const smsPrice = +formVal.messages * +formVal.user * +resData.smsPrice;
  
      const phoneCallPrice =
        +formVal.phoneCall * +formVal.user * +resData.phonCallPrice;
  
      let subPrice;
      subPrice = (
        (formVal.devices * finalUnitPrice * +resData.dollarRate +
          smsPrice +
          phoneCallPrice) *
        formVal.subscrYears
      ).toFixed(2);
  
      let sub = subPrice / (formVal.subscrYears * 12);
      const monthlySub = sub.toFixed(2);
  
      this.formData.patchValue({
        result: subPrice,
        resultMonth: monthlySub,
      });
    }
}


