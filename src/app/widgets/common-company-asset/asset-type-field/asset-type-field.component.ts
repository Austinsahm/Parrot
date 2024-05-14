import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input, Output, EventEmitter,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { map, takeUntil } from "rxjs/operators";
import { AssetTypeDataAccessService } from "src/app/data-access/asset-type-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-asset-type-field",
  templateUrl: "./asset-type-field.component.html",
  styleUrls: ["./asset-type-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetTypeFieldComponent),
      multi: true,
    },
  ],
})
export class AssetTypeFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
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
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(private readonly dataAccessor: AssetTypeDataAccessService) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });

    this.options$ = this.dataAccessor.fetch().pipe(
      map((options) => {
        return options.map((option) => ({
          key: option.assetId,
          value: option.assetId,
          label: option.assetName,
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
