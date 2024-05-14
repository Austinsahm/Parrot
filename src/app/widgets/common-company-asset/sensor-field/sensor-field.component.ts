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
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, of, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { MatSelectChange } from "@angular/material/select";
import { DeviceSensorDataAccessorService } from "src/app/data-access/device-sensor-data-accessor.service";
import { DeviceConfigurationDirectory } from "src/app/data-access/models/device.model";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-sensor-field",
  templateUrl: "./sensor-field.component.html",
  styleUrls: ["./sensor-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SensorFieldComponent),
      multi: true,
    },
  ],
})
export class SensorFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() set configId(value: string) {
    this.control.setValue("");
    // this.options$ = this._createSourceObservable(value);
  }

  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() device: DeviceConfigurationDirectory;
  @Input() new: boolean = false;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl("");
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(private readonly dataAccessor: DeviceSensorDataAccessorService) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });

    this.options$ = this._createSourceObservable(this.device);
  }

  private _createSourceObservable(device: DeviceConfigurationDirectory) {
    // if (!configId) {
    //   return of([]);
    // }
    return this.dataAccessor
      .getComboxAccessor(device)
      .fetch()
      .pipe(
        map((sensors) => {
          return sensors.map((sensor) => ({
            key: sensor.deviceSensorRefId + "-" + sensor.sensorName,
            value: sensor.deviceSensorRefId,
            label: sensor.sensorName,
          }));
        })
      );
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  onSelectionChange(event) {
    this.selectionChange.next(event);
  }
}
