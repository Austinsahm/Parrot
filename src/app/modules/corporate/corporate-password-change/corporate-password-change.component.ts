import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import { ChangePasswordData } from "src/app/data-access/models/company.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  UserRoleCode,
  UserSessionInformation,
} from "src/app/services/user.service";

@Component({
  selector: "app-corporate-password-change",
  templateUrl: "./corporate-password-change.component.html",
  styleUrls: ["./corporate-password-change.component.scss"],
})
export class CorporatePasswordChangeComponent implements OnInit {
  company: Domain;
  user: UserSessionInformation;
  formFontColor: string;
  formBgColor: string;
  formFont: string;

  get isAdmin(): boolean {
    return this.user?.roleId === UserRoleCode.ADMINISTRATOR;
  }

  constructor(
    private readonly companyService: CompanyInfoService,
    private readonly userInfoService: UserInfoService,
    private userHttpService: UserHttpService,
    private toastService: ToastrService,
    private readonly router: Router
  ) {
    this.formFontColor = this.companyService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyService.getCompanyInfo().formColor;
    this.formFont = this.companyService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.user = this.userInfoService.getUserInfo();
    this.company = this.companyService.getCompanyInfo();
  }

  saveHandler(formData: ChangePasswordData): void {
    this.userHttpService.updatePassword(formData).subscribe(
      (res) => {
        if (res.status === StatusCode.SUCCESS) {
          this.toastService.success(
            "Updated Password successful",
            "Update Password"
          );
        } else {
          this.toastService.error("Error while updating", "");
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }
}
