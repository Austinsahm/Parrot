import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DeviceDataAccessService } from "src/app/data-access/device-data-access.service";
import { DeviceFormData } from "src/app/data-access/models/device.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { DeviceService } from "../device.service";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-device-new",
  templateUrl: "./device-new.component.html",
  styleUrls: ["./device-new.component.scss"],
})
export class DeviceNewComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  // formFontColor: string
  primaryColour: string;

  deviceForm: FormGroup;
  network: string;

  subdomain: string;

  output: string;
  capturing: boolean = false;
  readonly = false;
  devicePac = false;
  manufDeviceId = false;
  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    private readonly deviceDataAccessor: DeviceDataAccessService,
    private deviceService: DeviceService,
    private readonly route: ActivatedRoute // public scanner: NgxScannerQrcodeComponent
  ) {
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.formFontColor = companyInfoService.getCompanyInfo().formFontColor;

    this.deviceForm = this.formBuilder.group({
      deviceId: "new-record-01",
      manufDeviceId: ["", [Validators.required]],
      deviceName: ["", [Validators.required]],
      deviceDesc: ["", [Validators.required]],
      clientDeviceCategId: ["", [Validators.required]],
      devicePac: ["", [Validators.required]],
      networkId: ["", [Validators.required]],
      certificate: ["", [Validators.required]],
      manufacturerId: ["", [Validators.required]],
      manufDeviceTypeId: ["", [Validators.required]],
      assetId: ["uncl", [Validators.required]],
      useCaseId: ["uncl", [Validators.required]],
      statusId: ["", [Validators.required]],
      lastSeenDate: [new Date().toISOString()],
      networkRefresh: [""],
      assetTracker: [""],
    });
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
  }

  cancel() {
    this.router.navigate(["../device-list"], { relativeTo: this.route });
  }

  onManufDeviceIdNetwork(network: string) {        
    return this.network === "lor" ? "DevEUI" : "Manuf. Device Id";
  }

  onCertNetwork(network: string) {
    // this.network = "lor";
    return this.network === "lor" ? "Appkey" : "Certificate";
  }

  onPACNetwork(network: string) {
    // this.network = "lor";
    return this.network === "lor" ? "AppEUI" : "PAC";
  }

  onDeviceNetwork(network: MatSelectChange) {
    this.network = network.value;
    this.deviceForm.patchValue({ networkId: network.value });
  }

  submit() {
    this.deviceForm.value.networkRefresh = this.deviceForm.value.networkRefresh
      ? "Y"
      : "N";

    this.deviceForm.value.assetTracker = this.deviceForm.value.assetTracker
      ? "Y"
      : "N";

    let deviceFormData: DeviceFormData = {
      companyId: this.userInfoService.getUserInfo().userCompanyId,
      userId: this.userInfoService.getUserInfo().userId,
      deviceAdd: [this.deviceForm.value],
    };

    this.deviceService.createDevice(deviceFormData).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.OK) {
          this.deviceDataAccessor.destroyAccessor(this.subdomain);
          this.toastService.success(
            "Created device successful",
            "Create Device"
          );
          this.router.navigate(["../device-list"], { relativeTo: this.route });
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

  captureQr() {
    this.capturing = true;
  }

  scan(id?: string) {
    if (id) {
      let manufDeviceId, devicePac;
      const data = id.split(",");
      if (data.length === 1) {
        manufDeviceId = id;
        this.deviceForm.patchValue({ manufDeviceId });
        this.manufDeviceId = true;
      } else {
        // const [manufDeviceId, devicePac] = id.split(",");
        // if (devicePac) this.devicePac = true;
        data.forEach((el) => {
          if (el.length <= 8) {
            this.manufDeviceId = true;
            manufDeviceId = el;
          } else {
            this.devicePac = true;
            devicePac = el;
          }
        });
        this.deviceForm.patchValue({ manufDeviceId, devicePac });
      }

      this.capturing = false;
      this.readonly = true;
    } else {
      this.capturing = false;
    }
  }
}
