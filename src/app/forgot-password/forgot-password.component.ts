import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserInfoService } from "../services/user-info.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyTypeCode } from "../data-access/models/company.model";
import { Domain } from "../data-access/models/domain.model";
import { CompanyInfoService } from "../services/company-info.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;

  isLoading: boolean;

  domain: Domain;

  formBgColor: string;
  formFontColor: string;
  formFont: string;

  constructor(
    private userService: UserService,
    private userInfoService: UserInfoService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private readonly route: ActivatedRoute,
    private router: Router,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.domain = this.route.parent.snapshot.data.companyInitData;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.isLoading = false;

    this.forgotForm = this.formBuilder.group(
      {
        userCompanyId: [this.domain.companyId, [Validators.required]],
        userId: ["", [Validators.required]],
        password: [
          "",
          // Validators.compose(
          [
            Validators.required,
            // Validators.minLength(8),
            // Validators.pattern(
            //   "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$"
            // ),
          ],
          // ),
        ],
        confirm_password: ["", Validators.required],
      },
      { validators: this.validatePassword("password", "confirm_password") }
    );
  }

  validatePassword(pass: string, conPass: string) {
    return (group: FormGroup) => {
      const password = group.controls[pass];
      const confirmPassword = group.controls[conPass];
      if (confirmPassword.errors && !confirmPassword.errors.validatePassword)
        return;
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ validatePassword: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    console.log(this.userInfoService.isAuthenticated());

    if (this.userInfoService.isAuthenticated()) {
      if (
        [CompanyTypeCode.CORPORATE, CompanyTypeCode.INDIVIDUAL].includes(
          this.domain.companyType
        )
      ) {
        this.router.navigateByUrl("corporate");
      } else {
        this.router.navigateByUrl("partner");
      }
      return;
    }
  }

  forgotPassword() {
    this.isLoading = true;
    const companyId = this.forgotForm.value.userCompanyId;
    const loginId = this.forgotForm.value.userId;
    const newPassword = this.forgotForm.value.password;
    const data = { companyId, loginId, newPassword };
    this.userService.forgetPassword(data).subscribe(
      (data) => {
        this.isLoading = false;
        if (!data.status)
          return this.toastrService.error(data.error?.message, "");
        this.toastrService.success("Password updated");
        this.router.navigateByUrl("login");
      },
      () => {}
    );
  }
}
