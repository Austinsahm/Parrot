import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CompanyService } from "../company.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StatusCode } from "../../../data-access/models/http.model";
import { CompanyDataAccessService } from "src/app/data-access/company-data-access.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { CompanyForm } from "src/app/data-access/models/company.model";
import { Observable } from "rxjs";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { DomainValidate } from "src/app/data-access/domain-validate";
import { CompanyStoreService } from "src/app/data-access/store/company-store.service";
import { CompanyNameValidator } from "src/app/data-access/company-name-validator";

@Component({
  selector: "app-company-new",
  templateUrl: "./company-new.component.html",
  styleUrls: ["./company-new.component.scss"],
})
export class CompanyNewComponent implements OnInit {
  companyNewForm: FormGroup;
  companyData: CompanyForm;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly companyInfoService: CompanyInfoService,
    private readonly companyDataAccessor: CompanyDataAccessService,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    private sessionService: SessionStorageService,
    private domainValidate: DomainValidate,
    private companyStore: CompanyStoreService,
    private companyName: CompanyNameValidator
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.permission$ = this.sessionService.partnerReadPermission();

    this.companyNewForm = this.formBuilder.group({
      companyId: "new-record-01",
      companyName: [
        "",
        {
          validators: [Validators.required],
          asyncValidators: this.companyName.validate,
          updateOn: "blur",
        },
      ],
      companyDesc: ["", [Validators.required]],
      companyAddress1: ["", [Validators.required]],
      companyAddress2: ["", [Validators.required]],
      timeZone: ["", [Validators.required]],
      companyAlias: [
        "",
        [Validators.required, Validators.minLength(4)],
        this.domainValidate.validate,
      ],
      statusId: ["", [Validators.required]],
      companyTypeId: ["", [Validators.required]],
      countryId: ["", [Validators.required]],
      adminEmail: ["", [Validators.required, Validators.email]],
      subdomain: [""],
      adminPryPhoneNo: ["", Validators.required],
      adminAltPhoneNo: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(["../company-list"], { relativeTo: this.route });
  }

  submit() {
    this.companyNewForm.patchValue({
      subdomain: this.companyNewForm.get("companyAlias").value,
    });

    this.companyData = {
      userCompanyId: this.userInfoService.getUserInfo().userCompanyId,
      userId: this.userInfoService.getUserInfo().userId,
      // createdBy: this.userInfoService.getUserInfo().roleName,
      ...this.companyNewForm.value,
    };

    this.companyService.createcompany(this.companyData).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.CREATED) {
          this.companyStore.companyList(
            this.companyInfoService.getCompanyInfo().companyId,
            true
          );
          this.companyDataAccessor.destroyAccessor();
          this.toastService.success(
            "Created company successful",
            "Create Company"
          );
          this.router.navigate(["../company-list"], { relativeTo: this.route });
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
