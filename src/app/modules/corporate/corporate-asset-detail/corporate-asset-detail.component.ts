import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of, zip } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { AssetDataAccessService } from "src/app/data-access/asset-data-access.service";
import { DeviceDataAccessService } from "src/app/data-access/device-data-access.service";
import { AssetHttpService } from "src/app/data-access/http/asset-http.service";
import {
  AssetDetail,
  AssetFormData,
} from "src/app/data-access/models/asset.model";
import { Device } from "src/app/data-access/models/device.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-corporate-asset-detail",
  templateUrl: "./corporate-asset-detail.component.html",
  styleUrls: ["./corporate-asset-detail.component.scss"],
})
export class CorporateAssetDetailComponent implements OnInit {
  editMode = false;
  source$: Observable<{ asset: AssetDetail; devices: Device[] }>;
  private _source: { asset: AssetDetail; devices: Device[] };
  private _constSource: { asset: AssetDetail; devices: Device[] };
  company: Domain;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  addDevices: Device[] = [];
  delDevices: Device[] = [];
  permission$: Observable<CorporatePermissionCategory>;

  primaryColour: string;
  secondaryColour: string;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly dataAccessor: AssetDataAccessService,
    private readonly deviceDataAccessor: DeviceDataAccessService,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private assetService: AssetHttpService,
    private toastService: ToastrService,
    private sessionService: SessionStorageService
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {
    this.source$ = this.route.paramMap.pipe(
      concatMap((params) => this._createSourceObservable(params.get("asset"))),
      tap((source) => {
        this._source = source;
        this._constSource = source;
      })
    );
  }

  private _createSourceObservable(
    assetId: string
  ): Observable<{ asset: AssetDetail; devices: Device[] }> {
    return this.dataAccessor
      .getAccessor(this.company?.companyId)
      .findDetail(assetId)
      .pipe(
        concatMap((asset) => {
          return zip(
            this.dataAccessor
              .getAccessor(this.company?.companyId)
              .findAssetDevicesById(this.company?.companyId, asset.assetId)
          ).pipe(
            map(([devices]) => {
              return { asset, devices };
            })
          );
        })
      );
  }

  edit() {
    this.editMode = true;
  }

  deviceChangeHandler(devices: Device[]): void {
    const source = Object.assign({}, this._source);
    source.devices = devices;

    this.source$ = of(source).pipe(tap((data) => (this._source = data)));

    this.addDevices = devices.filter(
      (device) => !this._constSource.devices.includes(device)
    );
  }

  deviceDeleteHandler(device: Device) {
    if (this._constSource.devices.includes(device)) {
      this.delDevices.push(device);
    }
  }

  cancel() {
    if (this.editMode) this.editMode = !this.editMode
    else this.router.navigate(["assets"], { relativeTo: this.route.parent.parent });
  }

  submit(details: AssetFormData) {
    let assetForm: AssetFormData = {
      assetId: this._source.asset.assetId,
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
      addDeviceList: this.addDevices.map((each) => ({
        deviceId: each.deviceId,
      })),
      delDeviceList: this.delDevices,
    };

    this.assetService.saveAsset(assetForm).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.OK) {
          this.dataAccessor.destroyAccessor(this.company.companyId);
          this.toastService.success("Update Asset successful", "Update Asset");
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
