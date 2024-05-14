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
import { UserTypeDataAccessorService } from "src/app/data-access/user-type-data-accessor.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-user-type-field",
  templateUrl: "./user-type-field.component.html",
  styleUrls: ["./user-type-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserTypeFieldComponent),
      multi: true,
    },
  ],
})
export class UserTypeFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable = false;
  @Input() defaultValue: string;

  private onChange = (value: string) => {};
  onTouched = () => {};

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl("");
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(private readonly dataAccessor: UserTypeDataAccessorService) {
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

  private _createSourceObservable(): Observable<ComboBoxOption<string>[]> {
    return this.dataAccessor.fetch().pipe(
      map((types) => {
        return types.map((type) => {
          return {
            key: type.userTypeId,
            value: type.userTypeId,
            label: type.userTypeName,
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
