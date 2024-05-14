import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, of, zip } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { DeviceDataAccessService } from "src/app/data-access/device-data-access.service";
import { DeviceSensorDataAccessorService } from "src/app/data-access/device-sensor-data-accessor.service";
import { DeviceHttpService } from "src/app/data-access/http/device-http.service";
import {
  DeviceConfigurationDirectory,
  DeviceConfigurationFormData,
  DeviceSensorDirectory,
} from "src/app/data-access/models/device.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { DeviceDirectoryStoreService } from "src/app/data-access/store/device-directory-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { AddSensorModalComponent } from "src/app/widgets/common-company-asset/add-sensor-modal/add-sensor-modal.component";
// import { UseCaseService } from 'src/app/data-access/http/use-case.service';
// import { UseCase } from 'src/app/data-access/models/use-case.model';

@Component({
  selector: "app-corporate-device-configuration-update",
  templateUrl: "./corporate-device-configuration-update.component.html",
  styleUrls: ["./corporate-device-configuration-update.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateDeviceConfigurationUpdateComponent implements OnInit {
  device$: Observable<{
    device: DeviceConfigurationDirectory;
    sensors: DeviceSensorDirectory[];
  }>;

  private data: {
    device: DeviceConfigurationDirectory;
    sensors: DeviceSensorDirectory[];
  };

  permission$: Observable<CorporatePermissionCategory>;

  form: FormGroup;
  subdomain: string;
  userId: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  private configId: string;

  alertTypes: Array<{
    label: string;
    value: string;
    id: string;
    checked?: boolean;
  }> = [
    { label: "SMS", value: "SMS", id: "chk_sms", checked: true },
    { label: "Email", value: "EMAIL", id: "chk_email" },
    { label: "Phone Call", value: "PHONE", id: "chk_phone" },
  ];
  deletedSensor: DeviceSensorDirectory[] = [];

  get alertControlValues(): string[] {
    const values: boolean[] = this.form.get("alertMethods")?.value || [];
    return values
      .map((checked, index) => {
        const value = this.alertTypes[index];
        value.checked = checked;

        return value;
      })
      .filter((value) => value.checked)
      .map((value) => value.value);
  }

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly modal: NgbModal,
    private readonly dataAccessor: DeviceDataAccessService,
    private readonly sensorDataAccessor: DeviceSensorDataAccessorService,
    private readonly companyInfoService: CompanyInfoService,
    private deviceHttpService: DeviceHttpService,
    private toastService: ToastrService,
    private userInfoService: UserInfoService,
    private sessionService: SessionStorageService,
    private deviceDirStore: DeviceDirectoryStoreService
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.userId = this.userInfoService.getUserInfo().userId;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.form = this.fb.group({
      configId: "",
      deviceId: "",
      assetId: ["", Validators.compose([Validators.required])],
      phoneNumb1: [""],
      phoneNumb2: [""],
      emailAddr1: [""],
      emailAddr2: [""],
      // alertMethods: this.fb.array(
      //   this.alertTypes.map((o) => new FormControl(o.checked))
      // ),
      useCaseId: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.device$ = this.route.paramMap.pipe(
      concatMap((params) => {
        this.configId = params.get("config");
        return this._resolve(this.subdomain, params.get("config")).pipe(
          tap(({ device }) => this._updateForm(device))
        );
      })
    );
  }

  private _resolve(
    subdomain: string,
    configId: string
  ): Observable<{
    device: DeviceConfigurationDirectory;
    sensors: DeviceSensorDirectory[];
  }> {
    return zip(
      this.dataAccessor
        .getAccessor(subdomain, this.userId)
        .findDirectoryByConfigId(configId),
      this.sensorDataAccessor.getDirectory(configId).fetch()
    ).pipe(
      map(([device, sensors]) => ({ device, sensors })),
      tap((result) => (this.data = result))
    );
  }

  private _updateForm(device: DeviceConfigurationDirectory): void {
    this.form.patchValue({
      configId: device?.configId,
      deviceId: device?.deviceId,
      assetId: device?.assetId,
      companyId: device?.companyId,
      useCaseId: device?.useCaseId,
      phoneNumb1: device.phoneNumb1,
      phoneNumb2: device.phoneNumb2,
      emailAddr1: device.emailAddr1,
      emailAddr2: device.emailAddr2,
    });
  }

  changeAssetId(e) {
    this.form.patchValue({ assetId: e.value });
  }

  changeUseCaseId(e) {
    this.form.patchValue({ useCaseId: e.value });
  }

  saveHandler(): void {
    let formData: DeviceConfigurationFormData = {
      ...this.form.value,
      sms: this.form.get("alertMethods")?.value[0] ? "Y" : "N",
      email: this.form.get("alertMethods")?.value[1] ? "Y" : "N",
      phone: this.form.get("alertMethods")?.value[2] ? "Y" : "N",
      deviceSensorTransList: [],
    };
    formData.deviceSensorTransList.push(
      ...this.data.sensors.map((each) => ({
        deviceSensorTransId: each.deviceSensorTransId,
        deviceSensorRefId: each.deviceSensorRefId,
        minValue: each.minValue,
        maxValue: each.maxValue,
        tolerableTime: each.tolerableTime,
        measureId: each.measureId,
        timeUnitId: each.timeUnitId,
      }))
    );

    this.deviceHttpService.updateDeviceConfiguration(formData).subscribe(
      (res) => {
        if (this.deletedSensor.length) {
          const deleteSensor = this.deletedSensor.map((each) => ({
            deviceSensorTransId: each.deviceSensorTransId,
          }));
          this.deviceHttpService
            .deleteDeviceConfiguration(deleteSensor)
            .subscribe({ error: () => {} });
          this.deletedSensor = [];
        }
        if (res.statusCode === StatusCode.OK) {
          this.dataAccessor.destroyAccessor(this.subdomain);
          this.sensorDataAccessor.destroyaccessor();
          this.deviceDirStore.getAllDeviceConfigDir(
            this.companyInfoService.getCompanyInfo().companyId,
            this.userId,
            true
          );
          this.toastService.success(
            "Updated Device Configuration successful",
            "Update Device Configuration"
          );
          this.router.navigate(["device-config"], {
            relativeTo: this.route.parent,
          });
        } else {
          this.toastService.error("Error while updating", "");
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }

  cancelHandler(): void {
    this.router.navigate(["device-config"], { relativeTo: this.route.parent });
  }

  openDetails(sensor: any): void {}

  addSensor(): void {
    const modalRef = this.modal.open(AddSensorModalComponent);
    (modalRef.componentInstance as AddSensorModalComponent).configId =
      this.configId;
    (modalRef.componentInstance as AddSensorModalComponent).device =
      this.data.device;
    (modalRef.componentInstance as AddSensorModalComponent).existingSensorIds =
      this.data.sensors.map((sensor) => sensor.deviceSensorRefId);

    modalRef.result.then(
      (sensor: DeviceSensorDirectory) => {
        if (!sensor) {
          return;
        }

        this.device$ = of({
          device: this.data.device,
          sensors: [...this.data.sensors, sensor],
        }).pipe(tap((reult) => (this.data = reult)));

        this.form.markAsDirty();

        this.cd.detectChanges();
      },
      () => {}
    );
  }

  editHandler(sensor: DeviceSensorDirectory): void {
    const modalRef = this.modal.open(AddSensorModalComponent);
    (modalRef.componentInstance as AddSensorModalComponent).editMode = true;
    (modalRef.componentInstance as AddSensorModalComponent).editSensor = sensor;
    (modalRef.componentInstance as AddSensorModalComponent).device =
      this.data.device;
    (modalRef.componentInstance as AddSensorModalComponent).configId =
      this.configId;
    (modalRef.componentInstance as AddSensorModalComponent).existingSensorIds =
      this.data.sensors.map((sensor) => sensor.deviceSensorRefId);

    modalRef.result.then(
      (editedSensor: DeviceSensorDirectory) => {
        if (!editedSensor) return;

        let editedIndex = this.data.sensors.findIndex(
          (devSensor) =>
            devSensor.deviceSensorTransId === editedSensor.deviceSensorTransId
        );
        this.data.sensors.splice(editedIndex, 1);

        this.device$ = of({
          device: this.data.device,
          sensors: [...this.data.sensors, editedSensor],
        }).pipe(tap((reult) => (this.data = reult)));

        this.form.markAsDirty();

        this.cd.detectChanges();
      },
      () => {}
    );
  }

  deleteHandler(sensor: DeviceSensorDirectory): void {
    this.form.markAsDirty();

    this.deletedSensor.push(sensor);

    const sensors = this.data.sensors.filter(
      (s) => s.deviceSensorRefId !== sensor.deviceSensorRefId
    );

    this.device$ = of({ device: this.data.device, sensors }).pipe(
      tap((reult) => (this.data = reult))
    );

    this.cd.detectChanges();
  }
}
