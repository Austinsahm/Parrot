import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ValidationError } from "@ngx-pwa/local-storage";
import { ToastrService } from "ngx-toastr";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import { ChangePasswordData } from "src/app/data-access/models/company.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  UserService,
  UserSessionInformation,
} from "src/app/services/user.service";

@Component({
  selector: "app-partner-change-password",
  templateUrl: "./partner-change-password.component.html",
  styleUrls: ["./partner-change-password.component.scss"],
})
export class PartnerChangePasswordComponent implements OnInit {
  user: UserSessionInformation;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  userId:string

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserInfoService,
    private userHttpService: UserHttpService,
    private toastService: ToastrService,
    protected readonly companyInfoService: CompanyInfoService,
  ) {
    this.user = this.userService.getUserInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void { }

  saveHandler(formData: ChangePasswordData): void {
    this.userHttpService.updatePassword(formData).subscribe(
      (res) => {
        if (res.status === StatusCode.SUCCESS) {
          this.toastService.success(
            "Updated Password successful",
            "Update Password"
          );
        } else {
          this.toastService.error("Error while creating", "");
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error(
            "You can't make the request, You are offline",
            ""
          );
        else this.toastService.error("Unknown errors", "");
      }
    );
  }
}
