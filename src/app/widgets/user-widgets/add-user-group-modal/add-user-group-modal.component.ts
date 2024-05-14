import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserGroupHttpService } from "src/app/data-access/http/user-group-http.service";
import {
  CompanyRole,
  CompanyTypeCode,
} from "src/app/data-access/models/company.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-user-group-modal",
  templateUrl: "./add-user-group-modal.component.html",
  styleUrls: ["./add-user-group-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserGroupModalComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  companyType: CompanyTypeCode;
  primaryColour: string;

  redirect: () => void;

  constructor(
    public modalRef: NgbActiveModal,
    private userGroupHttpService: UserGroupHttpService,
    private toastService: ToastrService,
    private userInfoService: UserInfoService,
    protected readonly companyInfoService: CompanyInfoService,
    // private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyType = this.companyInfoService.getCompanyInfo().companyType;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  saveHandler(form: FormGroup): void {
    let userData = form.value;
    userData.roleId = "new-record";
    userData.portal = this.userInfoService
      .getUserInfo()
      .companyTypeName.toLowerCase();
    userData.companyId =
      this.companyType === CompanyTypeCode.PARTNER
        ? form.value.company.companyId
        : this.userInfoService.getUserInfo().userCompanyId;
    delete userData.company;

    this.userGroupHttpService.createRole(userData).subscribe(
      (res) => {
        if (res.status === StatusCode.SUCCESS) {
          // this.userDataAccessor.destroyAccessor();
          this.toastService.success("Create Role successful", "Create Role");
          // window.location.reload();
          // this.router.navigate(['../users'], { relativeTo: this.route });
          // this.reloadCurrentPage();
          this.redirect();
        } else {
          this.toastService.error("Error while creating", "");
        }
      },
      (error) => {
        this.toastService.error(error.message, "");
      }
    );
  }

  reloadCurrentPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
