import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { UtilityHttpService } from "src/app/data-access/http/utility-http.service";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";
// import { StatusCode } from 'src/app/data-access/models/http.model';

@Component({
  selector: "app-corporate-bulk-device-load",
  templateUrl: "./corporate-bulk-device-load.component.html",
  styleUrls: ["./corporate-bulk-device-load.component.scss"],
})
export class CorporateBulkDeviceLoadComponent implements OnInit {
  deviceForm: FormGroup;
  companyId: string;
  userId: string;
  templateUrl: string;
  subdomain: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;
  filename: string;

  selectable: boolean = true;
  selectedFile: any = null;

  permission$: Observable<CorporatePermissionCategory>;

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    private readonly route: ActivatedRoute,
    private utilityService: UtilityHttpService,
    private sessionService: SessionStorageService
  ) {
    this.permission$ = this.sessionService.readPermission();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.deviceForm = this.formBuilder.group({
      fileSource: [""],
      title: ["", [Validators.required]],
      file: ["", [Validators.required]],
      useCaseId: ["uncl", [Validators.required]],
      networkId: ["", [Validators.required]],
      clientDeviceCategId: ["", [Validators.required]],
      manufacturerId: ["", [Validators.required]],
      manufDeviceTypeId: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyName;
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.userId = this.userInfoService.getUserInfo().userId;
    // this.templateUrl = this.utilityService.buildTemplateUrl(`utility/bulk-upload-device-template/companyId/${this.companyId}`);
  }

  cancel() {
    this.deviceForm.reset();
    this.filename = "";
  }

  onNetworkChange(event) {
    this.deviceForm.patchValue({ networkId: event.value });
  }

  onUseCaseChange(event) {
    this.deviceForm.patchValue({ useCaseId: event.value });
  }

  onDevCategChange(event) {
    this.deviceForm.patchValue({ clientDeviceCategId: event.value });
  }

  onDevManufChange(event) {
    this.deviceForm.patchValue({ manufacturerId: event.value });
  }

  onDevManufTypeChange(event) {
    this.deviceForm.patchValue({ manufDeviceTypeId: event.value });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.filename = file.name;

      this.deviceForm.patchValue({
        fileSource: file,
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append("uploadFile", this.deviceForm.get("fileSource").value);
    formData.append("userId", this.userId);
    formData.append("companyId", this.companyId);
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

        this.toastService.success(
          "Bulk Upload Completed",
          "Bulk Device Upload"
        );
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );

    // this.deviceForm.reset();
  }

  viewTemplate() {
    this.utilityService
      .viewTemplate({
        companyId: this.companyId,
        networkId: this.deviceForm.get("networkId").value,
      })
      .subscribe(
        (res) => {
          this.utilityService.downLoadFile(res, "application/ms-excel");
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );
  }
}
