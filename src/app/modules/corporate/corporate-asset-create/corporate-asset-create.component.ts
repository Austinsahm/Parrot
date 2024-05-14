import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AssetDataAccessService } from "src/app/data-access/asset-data-access.service";
import { AssetHttpService } from "src/app/data-access/http/asset-http.service";
import { AssetFormData } from "src/app/data-access/models/asset.model";
import { Device } from "src/app/data-access/models/device.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-corporate-asset-create",
  templateUrl: "./corporate-asset-create.component.html",
  styleUrls: ["./corporate-asset-create.component.scss"],
})
export class CorporateAssetCreateComponent implements OnInit {
  company: Domain;

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  addDevices: Device[] = [];

  delDevices: Device[] = [];

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private assetService: AssetHttpService,
    private toastService: ToastrService,
    private readonly assetDataService: AssetDataAccessService
  ) {
    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(["./"], { relativeTo: this.route.parent });
  }

  onDevicesChanged(devices: Device[]) {
    this.addDevices = devices;
  }

  submit(details: AssetFormData) {

    let assetForm: AssetFormData = {
      assetId: "new-record",
      assetName: details.assetName,
      assetDesc: details.assetDesc,
      assetTypeId: details.assetTypeId,
      locationId: details.locationId,
      statusId: "A",
      userCompanyId: this.company.companyId,
      userId: this.userInfoService.getUserInfo().userId,
      assetTankModel: {
        consumption: details.assetTankModel?.consumption,
        contentId: details.assetTankModel?.contentId,
        delVolume: details.assetTankModel?.delVolume,
        filling: details.assetTankModel?.filling,
        lastReading: details.assetTankModel?.filling,
        minUsefVolume: details.assetTankModel?.minUsefVolume,
        totalUsefVolume: details.assetTankModel?.totalUsefVolume,
        totalVolume: details.assetTankModel?.totalVolume,
        height: details.assetTankModel?.height,
        diameter: details.assetTankModel?.diameter,
      },
      addDeviceList: this.addDevices,
      delDeviceList: this.delDevices,
    };

    this.assetService.saveAsset(assetForm).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.OK) {
          this.assetDataService.destroyAccessor(this.company.companyId);
          this.toastService.success("Created Asset successful", "Create Asset");
          this.router.navigate(["../assets"], {
            relativeTo: this.route.parent,
          });
        } else {
          this.toastService.error("Error while creating", "");
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
