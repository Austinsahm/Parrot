import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyInfoService } from "src/app/services/company-info.service";
import {
  DeviceDataAccessor,
  DeviceDataAccessService,
} from "src/app/data-access/device-data-access.service";
import { Observable, of } from "rxjs";
import {
  DeviceCategoryDirectory,
  DeviceDetail,
  DeviceFormData,
} from "src/app/data-access/models/device.model";
import { catchError, concatMap, map, tap } from "rxjs/operators";
import { DeviceCategoryDataAccessService } from "src/app/data-access/device-category-data-access.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { StatusCode } from "src/app/data-access/models/http.model";
import { ToastrService } from "ngx-toastr";
import { DeviceService } from "../device.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeviceMoreDetailModalComponent } from "../device-more-detail-modal/device-more-detail-modal.component";
import { DeviceHttpService } from "src/app/data-access/http/device-http.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";

@Component({
  selector: "app-device-detail",
  templateUrl: "./device-detail.component.html",
  styleUrls: ["./device-detail.component.scss"],
})
export class DeviceDetailComponent implements OnInit {
  formBgColor: string;
  formFont: string;
  formFontColor: string;

  deviceForm: FormGroup;
  subdomain: string;

  editMode = false;
  device$: Observable<{
    device: DeviceDetail;
    category: DeviceCategoryDirectory;
  }>;

  deviceConst: DeviceDetail;

  deviceName: string;
  primaryColour: string;

  userId: string;

  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private readonly dataAccessor: DeviceDataAccessService,
    private readonly deviceDataAccessor: DeviceDataAccessService,
    private readonly categoryDataAccessor: DeviceCategoryDataAccessService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    private deviceService: DeviceService,
    private readonly modal: NgbModal,
    private deviceHttpService: DeviceHttpService,
    private sessionService: SessionStorageService,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();

    this.deviceName = this.route.snapshot.queryParamMap.get("deviceName");
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

    this.userId = this.userInfoService.getUserInfo().userId;

    this.deviceForm = this.formBuilder.group({
      deviceId: "",
      manufDeviceId: ["", [Validators.required]],
      manufacturerId: ["", [Validators.required]],
      deviceName: [this.deviceName, [Validators.required]],
      deviceDesc: ["", [Validators.required]],
      clientDeviceCategId: ["", [Validators.required]],
      devicePac: ["", [Validators.required]],
      useCaseId: ["uncl", [Validators.required]],
      networkId: ["", [Validators.required]],
      manufDeviceTypeId: ["", [Validators.required]],
      statusId: ["", [Validators.required]],
      assetId: ["", [Validators.required]],
      lastSeenDate: [""],
    });

    this.device$ = this.route.paramMap
      .pipe(
        concatMap((params) => {
          return this._createSourceObservable(
            params.get("id"),
            params.get("companyId")
          );
        })
      )
      .pipe(
        tap(({ device, category }) => {
          this.deviceConst = device;
          this.subdomain = device.companyId;
          this._updateForm(device, category);
        })
      );
  }

  ngOnInit(): void {}

  private _createSourceObservable(
    deviceId: string,
    subdomain: string
  ): Observable<{ device: DeviceDetail; category: DeviceCategoryDirectory }> {
    return this.dataAccessor
      .getAccessor(subdomain, this.userId)
      .findById(deviceId, subdomain)
      .pipe(
        concatMap((device) => {
          return this.categoryDataAccessor
            .getAccessor(subdomain)
            .directory.findByName(device.clientDeviceCategId)
            .pipe(
              catchError(() => of({} as DeviceCategoryDirectory)),
              map((category) => ({ device: device, category }))
            );
        })
      );
  }

  /**
   * Updates form with given device information
   */
  private _updateForm(
    device: DeviceDetail,
    category: DeviceCategoryDirectory
  ): void {
    this.deviceForm.patchValue({
      manufDeviceId: device.manufDeviceId,
      deviceId: device?.deviceId,
      clientDeviceCategId: device.clientDeviceCategId,
      devicePac: device.devicePac,
      deviceDesc: device.deviceDesc,
      networkId: device.networkId,
      manufDeviceTypeId: device.manufDeviceTypeId,
      statusId: device.statusId,
      manufacturerId: device.manufacturerId,
      deviceLastSeen: device.lastSeenDate,
      assetId: device.assetId,
    });

    console.log(this.deviceForm.value);
    
  }

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.router.navigate(["../../../../device-list"], {
      relativeTo: this.route,
    });
  }

  onManufDeviceIdNetwork(network: string) {
    return network === "lor" ? "DevEUI" : "Manuf. Device Id";
  }

  onCertNetwork(network: string) {
    return network === "lor" ? "Appkey" : "Certificate";
  }

  onPACNetwork(network: string) {
    return network === "lor" ? "AppEUI" : "PAC";
  }

  submit() {
    let deviceFormData: DeviceFormData = {
      companyId: this.userInfoService.getUserInfo().userCompanyId,
      userId: this.userInfoService.getUserInfo().userId,
      deviceAdd: [this.deviceForm.value],
    };

    this.deviceService.createDevice(deviceFormData).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.OK) {
          this.deviceDataAccessor
            .getAccessor(
              this.companyInfoService.getCompanyInfo().companyId,
              this.userId
            )
            .fetch(true)
            .subscribe(
              () => {
                this.dataAccessor.destroyAccessor(this.subdomain);
                this.toastService.success(
                  " Device Update successful",
                  "Update Device"
                );
                this.router.navigate(["../../../../device-list"], {
                  relativeTo: this.route,
                });
              },
              () => {}
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

  private _fetchMoreDetails(lastSeenMsgId: string) {
    return this.deviceHttpService.fetchMoreDeviceDetails(lastSeenMsgId);
  }

  moreDetails(entry: DeviceDetail): void {
    const modalRef = this.modal.open(DeviceMoreDetailModalComponent);
    (modalRef.componentInstance as DeviceMoreDetailModalComponent).deviceName =
      this.deviceName;
    (
      modalRef.componentInstance as DeviceMoreDetailModalComponent
    ).moreDetails$ = this._fetchMoreDetails(entry.lastSeenMsgId);
  }
}
