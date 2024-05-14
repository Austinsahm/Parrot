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
import { Observable, of, Subject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { map, takeUntil } from "rxjs/operators";
import { AssetDataAccessService } from "src/app/data-access/asset-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-asset-field",
  templateUrl: "./asset-field.component.html",
  styleUrls: ["./asset-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetFieldComponent),
      multi: true,
    },
  ],
})
export class AssetFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() set subdomain(value: string) {
    this.control.setValue("");
    this.options$ = this._createSourceObservable(value);
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
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(private readonly dataAccessor: AssetDataAccessService) {
    this.options$ = this._createSourceObservable();
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  private _createSourceObservable(
    subdomain?: string
  ): Observable<ComboBoxOption<string>[]> {
    if (!subdomain) {
      return of([]);
    }

    const accessor = this.dataAccessor.getAccessor(subdomain);

    return accessor.fetch().pipe(
      map((assets) => {
        return assets.map((asset) => {
          return {
            key: asset.assetId,
            value: asset.assetId,
            label: asset.assetName,
          };
        });
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