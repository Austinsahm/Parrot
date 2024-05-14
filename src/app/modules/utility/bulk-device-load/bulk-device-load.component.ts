import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { DeviceDataAccessService } from "src/app/data-access/device-data-access.service";
import { UtilityHttpService } from "src/app/data-access/http/utility-http.service";
import { StatusCode } from "src/app/data-access/models/http.model";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-bulk-device-load",
  templateUrl: "./bulk-device-load.component.html",
  styleUrls: ["./bulk-device-load.component.scss"],
})
export class BulkDeviceLoadComponent implements OnInit {
  deviceForm: FormGroup;
  companyId: string;
  userId: string;
  templateUrl: string;
  subdomain: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  filename:string

  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    private readonly route: ActivatedRoute,
    private utilityService: UtilityHttpService,
    private sessionService: SessionStorageService,
    private readonly deviceDataAccessor: DeviceDataAccessService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
    this.userId = this.userInfoService.getUserInfo().userId;
    // this.templateUrl = this.utilityService.buildTemplateUrl(`utility/bulk-upload-device-template/companyId/${this.companyId}`);

    this.deviceForm = this.formBuilder.group({
      fileSource: [""],
      title: ["", [Validators.required]],
      file: ["", [Validators.required]],
      companyId: ["", [Validators.required]],
      networkId: ["", [Validators.required]],
      clientDeviceCategId: ["", [Validators.required]],
      manufacturerId: ["", [Validators.required]],
      manufDeviceTypeId: ["", [Validators.required]],
      useCaseId: ["uncl", [Validators.required]],
    });
  }

  cancel() {
    this.deviceForm.reset();
    this.filename = "";
  }

  changeCompany(event) {
    this.companyId = this.deviceForm.get("companyId").value;
    this.templateUrl = this.utilityService.buildTemplateUrl(
      `utility/bulk-upload-device-template/companyId/${this.companyId}`
    );
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.filename=file.name
      

      this.deviceForm.patchValue({
        fileSource: file,
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append("uploadFile", this.deviceForm.get("fileSource").value);
    formData.append("userId", this.userId);
    formData.append("companyId", this.deviceForm.get("companyId").value);
    formData.append("title", this.deviceForm.get("title").value);
    formData.append("useCaseId", this.deviceForm.get("useCaseId").value);
    formData.append("network", this.deviceForm.get("networkId").value);
    formData.append(
      "deviceManufacturer",
      this.deviceForm.get("manufacturerId").value
    );
    formData.append(
      "manufDevType",
      this.deviceForm.get("manufDeviceTypeId").value
    );
    formData.append(
      "deviceCategory",
      this.deviceForm.get("clientDeviceCategId").value
    );
    formData.append("refresh", "Y");

    this.utilityService.bulkDeviceUpload(formData).subscribe(
      (res) => {
        this.utilityService.downLoadFile(res, "application/ms-excel");
        this.deviceDataAccessor
          .getAccessor(
            this.companyInfoService.getCompanyInfo().companyId,
            this.userId
          )
          .fetch(true)
          .subscribe({ error: () => {} });
        this.toastService.success(
          "Bulk Upload Completed",
          "Bulk Device Upload"
        );
      },
      (error) => {
        if (!error.status)
          this.toastService.error(
            "You can't make the request, You are offline",
            ""
          );
        else this.toastService.error("Error importing devices");
      }
    );

    // this.deviceForm.reset();
  }

  viewTemplate() {
    this.utilityService
      .viewTemplate({
        companyId: this.deviceForm.get("companyId").value,
        networkId: this.deviceForm.get("networkId").value,
      })
      .subscribe(
        (res) => {
          this.utilityService.downLoadFile(res, "application/ms-excel");
        },
        () => {}
      );
  }
}
