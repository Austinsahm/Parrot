import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { DeviceManufacturerDataAccessService } from "src/app/data-access/device-manufacturer-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-device-manufacturer-field",
  templateUrl: "./device-manufacturer-field.component.html",
  styleUrls: ["./device-manufacturer-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceManufacturerFieldComponent),
      multi: true,
    },
  ],
})
export class DeviceManufacturerFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() disable: boolean;
  @Input() new: boolean = false;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();

  control = new FormControl("");
  manufacturers$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dataAccessor: DeviceManufacturerDataAccessService
  ) {}

  ngOnInit(): void {
    this.manufacturers$ = this.dataAccessor.fetch().pipe(
      map((manufacturers) => {
        return manufacturers.map((manufacturer) => {
          return {
            key: manufacturer.manufacturerId,
            value: manufacturer.manufacturerId,
            label: manufacturer.manufacturerName,
          };
        });
      })
    );

    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });
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

  setDisabledState?(isDisabled: boolean): void {}

  onSelectionChange(event) {
    this.selectionChange.next(event);
  }
}
