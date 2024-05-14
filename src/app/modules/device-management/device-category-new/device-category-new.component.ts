import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { DeviceCategoryFormData } from "src/app/data-access/models/device.model";
import { DeviceService } from "../device.service";
import { DeviceCategoryDataAccessService } from "src/app/data-access/device-category-data-access.service";
import { DeviceDirectoryStoreService } from "src/app/data-access/store/device-directory-store.service";

@Component({
  selector: "app-device-type-new",
  templateUrl: "./device-category-new.component.html",
  styleUrls: ["./device-category-new.component.scss"],
})
export class DeviceCategoryNewComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;

  deviceForm: FormGroup;
  subdomain: string;
  primaryColour: string;
  secondaryColour: string;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    private readonly categoryDataAccessor: DeviceCategoryDataAccessService,
    private deviceService: DeviceService,
    private deviceDirStore: DeviceDirectoryStoreService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.deviceForm = this.formBuilder.group({
      clientDeviceCategId: "new-record-01",
      userId: userInfoService.getUserInfo().userId,
      deviceCategName: ["", [Validators.required]],
      deviceCategDesc: ["", [Validators.required]],
      // contact: [""],
      companyId: ["", [Validators.required]],
      networkId: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
  }

  cancel() {
    this.router.navigate(["../device-category-list"], {
      relativeTo: this.route,
    });
  }

  submit() {
    let formData: DeviceCategoryFormData;

    formData = { ...this.deviceForm.value, deviceAdd: [], deviceDel: [] };

    this.deviceService.createDeviceCategory(formData).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.OK) {
          this.deviceDirStore.getDeviceCategoryDirectory(
            this.subdomain,
            "",
            true
          );
          this.categoryDataAccessor.destroyAccessor(this.subdomain);
          this.toastService.success(
            "Created device category successful",
            "Create Device Category"
          );
          this.router.navigate(["../device-category-list"], {
            relativeTo: this.route,
          });
        } else {
          this.toastService.error("Error while creating", "");
        }
      },
      (error) => {
        this.toastService.error(error.message, "");
      }
    );
  }
}
