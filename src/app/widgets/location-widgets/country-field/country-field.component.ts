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
import { CountryDataAccessService } from "src/app/data-access/country-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-country-field",
  templateUrl: "./country-field.component.html",
  styleUrls: ["./country-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryFieldComponent),
      multi: true,
    },
  ],
})
export class CountryFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable = false;
  @Input() defaultValue: string;

  onChange = (value: string) => {};
  onTouched = () => {};

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  disabled: boolean;
  countries$: Observable<ComboBoxOption<string>[]>;
  control = new FormControl("");
  private unsubscriber = new Subject();

  constructor(private readonly countryDataAccessor: CountryDataAccessService) {}

  ngOnInit(): void {
    this.countries$ = this.countryDataAccessor.fetch().pipe(
      map((countries) => {
        return countries.map((country) => ({
          key: country.countryId,
          value: country.countryId,
          label: country.countryName,
        }));
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
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event) {
    this.selectionChange.next(event);
  }
}
