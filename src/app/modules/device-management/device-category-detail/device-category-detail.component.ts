import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { DeviceCategoryDataAccessService } from "src/app/data-access/device-category-data-access.service";
import { Observable, of, zip } from "rxjs";
import {
  Device,
  DeviceCategory,
  DeviceCategoryFormData,
} from "src/app/data-access/models/device.model";
import { concatMap, map, tap } from "rxjs/operators";
import { DeviceDataAccessService } from "src/app/data-access/device-data-access.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeviceCategoryDeviceModalComponent } from "../device-category-device-modal/device-category-device-modal.component";
import { UserInfoService } from "src/app/services/user-info.service";
import { ToastrService } from "ngx-toastr";
import { StatusCode } from "src/app/data-access/models/http.model";
import { DeviceService } from "../device.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { DeviceDirectoryStoreService } from "src/app/data-access/store/device-directory-store.service";

@Component({
  selector: "app-device-type-detail",
  templateUrl: "./device-category-detail.component.html",
  styleUrls: ["./device-category-detail.component.scss"],
})
export class DeviceCategoryDetailComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  deviceTypeForm: FormGroup;
  editMode = false;
  subdomain: string;
  source$: Observable<{ category: DeviceCategory; devices: Device[] }>;

  private _source: { category: DeviceCategory; devices: Device[] };

  deviceAdd: { deviceId: string }[] = [];

  deviceDel: { deviceId: string }[] = [];

  userId: string;
  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private readonly modal: NgbModal,
    private readonly dataAccessor: DeviceCategoryDataAccessService,
    private readonly deviceDataAccessor: DeviceDataAccessService,
    private readonly companyInfoService: CompanyInfoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    private deviceService: DeviceService,
    private sessionService: SessionStorageService,
    private deviceDirStore: DeviceDirectoryStoreService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

    this.permission$ = this.sessionService.partnerReadPermission();

    this.deviceTypeForm = this.formBuilder.group({
      deviceCategName: ["", [Validators.required]],
      deviceCategDesc: ["", [Validators.required]],
      // contact: ["", [Validators.required]],
      companyId: ["", [Validators.required]],
      clientDeviceCategId: "",
      networkId: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.userId = this.userInfoService.getUserInfo().userId;

    this.source$ = this.route.paramMap.pipe(
      concatMap((params) => {
        return this._createSourceObservable(
          this.subdomain,
          params.get("id")
        ).pipe(
          tap(({ category, devices }) => {
            this._updateForm(category);
            this._source = { category, devices };
          })
        );
      })
    );
  }

  private _createSourceObservable(
    subdomain: string,
    categoryId: string
  ): Observable<{ category: DeviceCategory; devices: Device[] }> {
    return this.dataAccessor
      .getAccessor(subdomain, categoryId)
      .full.findById(categoryId)
      .pipe(
        concatMap((category) => {
          return this.deviceDataAccessor
            .getAccessor(subdomain, this.userId)
            .fetchByCategoryName(category.deviceCategName)
            .pipe(
              map((devices) => ({ category, devices })),
              tap((devices) =>{                
                this.deviceTypeForm.patchValue({
                  networkId: devices.category.networkId,
                })}

              )
            );
        })
      );
  }

  private _updateForm(category: DeviceCategory): void {
    this.deviceTypeForm.patchValue({
      deviceCategName: category.deviceCategName,
      deviceCategDesc: category.deviceCategDesc,
      //contact: category.companyName,
      companyId: category.companyId,
      clientDeviceCategId: category.deviceCategId,
    });
  }

  edit() {
    this.editMode = true;
  }

  addDevice(category: DeviceCategory) {
    const modalRef = this.modal.open(DeviceCategoryDeviceModalComponent, {
      size: "lg",
    });
    (
      modalRef.componentInstance as DeviceCategoryDeviceModalComponent
    ).subdomain = this.subdomain;
    (
      modalRef.componentInstance as DeviceCategoryDeviceModalComponent
    ).category = category;
    (
      modalRef.componentInstance as DeviceCategoryDeviceModalComponent
    ).existingDeviceIds = this._source.devices.map((d) => d.deviceId);

    modalRef.result.then(
      (devices: Device[]) => {
        if (!devices?.length) {
          return;
        }

        this.source$ = of({
          category: this._source.category,
          devices: [...devices, ...this._source.devices],
        }).pipe(tap((source) => (this._source = source)));

        this.deviceAdd.push(
          ...devices.map(({ deviceId }) => <{ deviceId: string }>{ deviceId })
        );
      },
      () => {}
    );
  }

  deleteHandler(device: Device): void {
    const devices = this._source.devices.filter(
      (d) => d.deviceId !== device.deviceId
    );

    this.source$ = of({ category: this._source.category, devices }).pipe(
      tap((source) => (this._source = source))
    );

    let deviceIndex = this.deviceAdd.findIndex(
      (value) => value.deviceId == device.deviceId
    );

    if (deviceIndex == -1) {
      this.deviceDel.push({ deviceId: device.deviceId });
    } else {
      this.deviceAdd.splice(deviceIndex, 1);
    }
  }

  cancel() {
    this.router.navigate(["../../device-category-list"], {
      relativeTo: this.route,
    });
  }

  submit() {
    let formData: DeviceCategoryFormData = {
      ...this.deviceTypeForm.value,
      userId: this.userInfoService.getUserInfo().userId,
      deviceAdd: this.deviceAdd,
      deviceDel: this.deviceDel,
    };

    this.deviceService.updateDeviceCategory(formData).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.OK) {
          this.deviceDirStore.getDeviceCategoryDirectory(
            this.companyInfoService.getCompanyInfo().companyId,
            "",
            true
          );
          this.dataAccessor.destroyAccessor(this.subdomain);
          this.toastService.success(
            "Updated device category successful",
            "Update Device Category"
          );
          this.router.navigate(["../../device-category-list"], {
            relativeTo: this.route,
          });
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
