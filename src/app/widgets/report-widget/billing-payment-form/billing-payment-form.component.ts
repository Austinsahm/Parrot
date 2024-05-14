import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Domain } from "src/app/data-access/models/domain.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ToastrService } from "ngx-toastr";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-billing-payment-form",
  templateUrl: "./billing-payment-form.component.html",
  styleUrls: ["./billing-payment-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingPaymentFormComponent implements OnInit, OnChanges {
  @Input() reload: boolean;
  formFont: string;
  form: FormGroup;
  companyType: string;
  userEmail: string;

  constructor(
    private readonly fb: FormBuilder,
    private userInfoService: UserInfoService
  ) {
    this.userEmail = userInfoService.getUserInfo().emailAddress;
    this.companyType = userInfoService.getUserInfo().companyTypeName;

    this.form = this.fb.group({
      email: ["", Validators.compose([Validators.required])],
      amount: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      ref: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    const random = this.refGen();
    if (this.companyType === "CORPORATE")
      this.form.patchValue({ email: this.userEmail, ref: random });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const random = this.refGen();
    this.form.patchValue({ ref: random });
  }

  private refGen(): string {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
