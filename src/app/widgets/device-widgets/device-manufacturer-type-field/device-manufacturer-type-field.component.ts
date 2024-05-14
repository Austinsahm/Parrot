import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, of, Subject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { map, takeUntil } from "rxjs/operators";
import { DeviceManufacturerTypeDataAccessService } from "src/app/data-access/device-manufacturer-type-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-device-manufacturer-type-field",
  templateUrl: "./device-manufacturer-type-field.component.html",
  styleUrls: ["./device-manufacturer-type-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceManufacturerTypeFieldComponent),
      multi: true,
    },
  ],
})
export class DeviceManufacturerTypeFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() set manufacturerId(value: string) {
    this.control.setValue("");
    this.types$ = this._createSource(value);
  }
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() new: boolean = false;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl("");
  types$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dataAccessor: DeviceManufacturerTypeDataAccessService
  ) {}

  ngOnInit(): void {
    // this.types$ = this._createSource();

    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  private _createSource(
    manufacturerId?: string
  ): Observable<ComboBoxOption<string>[]> {
    if (!manufacturerId) {
      return of([]);
    }

    return this.dataAccessor
      .getAccessor(manufacturerId)
      .fetch()
      .pipe(
        map((types) => {
          return types.map((type) => ({
            key: type.manufDeviceTypeId,
            value: type.manufDeviceTypeId,
            label: type.deviceTypeName,
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
