import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { DeviceSensorDataAccessorService } from "src/app/data-access/device-sensor-data-accessor.service";
import {
  DeviceConfigurationDirectory,
  DeviceSensorDirectory,
} from "src/app/data-access/models/device.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-add-sensor-modal",
  templateUrl: "./add-sensor-modal.component.html",
  styleUrls: ["./add-sensor-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSensorModalComponent implements OnInit, OnDestroy {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;
  editSensorOption: string;
  editSensorMeasure: string;
  editSensorTolerable: string;

  @Input() configId: string;
  @Input() existingSensorIds: string[] = [];
  @Input() device: DeviceConfigurationDirectory; //Observable<{ device: DeviceConfigurationDirectory, sensors: DeviceSensorDirectory[] }>;

  @Input() editMode: boolean = false;
  @Input() editSensor: DeviceSensorDirectory;

  form: FormGroup;
  private unsubscriber = new Subject();

  isMaxValueInvalid = false;

  toltimeOptions: ComboBoxOption<string>[] = [
    { label: "Seconds", value: "sec", key: "sec-Seconds" },
    { label: "Minutes", value: "min", key: "min-Minutes" },
    { label: "Hours", value: "hrs", key: "hrs-Hours" },
    { label: "Days", value: "dys", key: "dys-Days" },
    { label: "Months", value: "mts", key: "mts-Month" },
    { label: "Quarters", value: "qtr", key: "qtr-Quarters" },
    { label: "Years", value: "yrs", key: "yrs-Years" },
  ];

  deviceSensorData: DeviceSensorDirectory = {
    sensorName: "",
    deviceSensorRefId: "",
    minValue: "",
    maxValue: "",
    measureName: "",
    measureId: "",
    tolerableTime: "",
    sensorId: "",
    timeUnitName: "",
    timeUnitId: "",
    deviceSensorTransId: "",
  };

  constructor(
    private readonly fb: FormBuilder,
    public readonly modalRef: NgbActiveModal,
    private readonly companyInfoService: CompanyInfoService,
    private readonly sensorDataAccessor: DeviceSensorDataAccessorService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      deviceSensorRefId: ["", Validators.compose([this.uniqueSensor])],
      minValue: ["", Validators.compose([Validators.required])],
      maxValue: ["", Validators.compose([Validators.required])],
      measure: ["", Validators.compose([Validators.required])],
      tolerableTime: ["", Validators.compose([Validators.required])],
      tolerableMeasure: ["", Validators.compose([Validators.required])],
      configId: [this.configId, Validators.compose([Validators.required])],
    });

    if (this.editMode) {
      let editSensorId = this.existingSensorIds.findIndex(
        (refId) => refId === this.editSensor.deviceSensorRefId
      );
      this.existingSensorIds.splice(editSensorId, 1);

      this.form.patchValue({
        deviceSensorRefId: this.editSensor.deviceSensorRefId,
        minValue: this.editSensor.minValue,
        maxValue: this.editSensor.maxValue,
        measure: this.editSensor.measureId,
        tolerableTime: this.editSensor.tolerableTime,
        tolerableMeasure: this.editSensor.timeUnitId,
      });
      this.editSensorOption = this.editSensor.deviceSensorRefId + '-' + this.editSensor.sensorName
      this.editSensorMeasure = this.editSensor.measureId + '-' + this.editSensor.measureName
      this.editSensorTolerable = this.editSensor.timeUnitId + '-' + this.editSensor.timeUnitName
    }
  }

  private uniqueSensor = (c: AbstractControl): ValidationErrors => {
    if (!c.value) {
      return null;
    }

    return (this.existingSensorIds || []).includes(c.value)
      ? { uniqueSensor: true }
      : null;
  };

  onChangeSensor(e) {
    this.form.patchValue({deviceSensorRefId: e.value.split('-')[0]})    
    this.deviceSensorData.sensorName = e.value.split('-')[1];
    // let text = $event.target.options[$event.target.options.selectedIndex].text;
  }

  onChangeMeasure(e) {
    this.form.patchValue({measure: e.value.split('-')[0]})
    this.deviceSensorData.measureName = e.value.split('-')[1];
    // let text = $event.target.options[$event.target.options.selectedIndex].text;
  }

  onChangeTolerableMeasure(e) {
    this.form.patchValue({tolerableMeasure: e.value.split('-')[0]})
    this.deviceSensorData.timeUnitName = e.value.split('-')[1];
    // let text = $event.target.options[$event.target.options.selectedIndex].text;
  }

  saveHandler(): void {
    if (this.form.get("minValue").value > this.form.get("maxValue").value) {
      this.isMaxValueInvalid = true;
      return;
    } else this.isMaxValueInvalid = false;

    if (this.form.invalid) {
      return;
    }

    this.deviceSensorData.deviceSensorTransId = this.editMode
      ? this.editSensor.deviceSensorTransId
      : "new-record";
    this.deviceSensorData.deviceSensorRefId =
      this.form.get("deviceSensorRefId").value;
    this.deviceSensorData.maxValue = this.form.get("maxValue").value;
    this.deviceSensorData.minValue = this.form.get("minValue").value;
    this.deviceSensorData.measureId = this.form.get("measure").value;
    this.deviceSensorData.tolerableTime = this.form.get("tolerableTime").value;
    this.deviceSensorData.timeUnitId = this.form.get("tolerableMeasure").value;

    if (this.editMode) {
      if (!this.deviceSensorData.sensorName) {
        this.deviceSensorData.sensorName = this.editSensor.sensorName;
      }
      if (!this.deviceSensorData.measureName) {
        this.deviceSensorData.measureName = this.editSensor.measureName;
      }
      if (!this.deviceSensorData.timeUnitName)
        this.deviceSensorData.timeUnitName = this.editSensor.timeUnitName;
    }
    
    this.modalRef.close(this.deviceSensorData);

    // this.sensorDataAccessor.getComboxAccessor(this.configId).findById(this.form.value.sensorId).pipe(
    //   map((sensor) => {
    //     const value = this.form.value as DeviceSensorDirectory;
    //     value.sensorName = sensor.sensorName;

    //     return value;
    //   }),
    //   takeUntil(this.unsubscriber)
    // ).subscribe(this.modalRef.close);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
