import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  Output,
  OnDestroy,
  OnInit,
  EventEmitter,
} from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, of, Subject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { map, takeUntil } from "rxjs/operators";
import { DeviceSensorHttpService } from "src/app/data-access/http/device-sensor-http.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-sensor-measure-field",
  templateUrl: "./sensor-measure-field.component.html",
  styleUrls: ["./sensor-measure-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SensorMeasureFieldComponent),
      multi: true,
    },
  ],
})
export class SensorMeasureFieldComponent implements OnInit {
  sensorMeasures$: Observable<ComboBoxOption<string>[]>;
  control = new FormControl("");
  private unsubscriber = new Subject();
  disabled: boolean;

  @Input() configId: string;

  @Input() set deviceSensorRefId(deviceSensorRefId: string) {
    this.control.setValue("");
    this.sensorMeasures$ = this._createSourceObservable(deviceSensorRefId);
  }
  @Input() new: boolean = false;

  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private _createSourceObservable(deviceSensorRefId: string) {
    if (!deviceSensorRefId) {
      return of([]);
    }
    return this.sensorMeasureService
      .fetchSensorMeasure(this.configId, deviceSensorRefId)
      .pipe(
        map((sensorMeasures) => {
          return sensorMeasures.map((sensorMeasure) => ({
            key: sensorMeasure.measureId + '-' + sensorMeasure.measureName,
            value: sensorMeasure.measureId,
            label: sensorMeasure.measureName,
          }));
        })
      );
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  constructor(private sensorMeasureService: DeviceSensorHttpService) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  writeValue(value: string): void {
    this.control.setValue(value || "");
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  onSelectionChange(event) {
    this.selectionChange.next(event);
  }
}
