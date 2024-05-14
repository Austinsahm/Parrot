import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { CompanyTypeDataAccessService } from "src/app/data-access/company-type-data-access.service";
import { CompanyTypeCode } from "src/app/data-access/models/company.model";
import { ComboBoxOption } from "../../common-widgets/types";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-company-type-field",
  templateUrl: "./company-type-field.component.html",
  styleUrls: ["./company-type-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CompanyTypeFieldComponent),
      multi: true,
    },
  ],
})
export class CompanyTypeFieldComponent implements OnInit {
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable = false;
  @Input() defaultValue: string;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl("");
  types$: Observable<ComboBoxOption<CompanyTypeCode>[]>;
  constructor(
    private readonly companyTypeDataAccessor: CompanyTypeDataAccessService
  ) {}

  ngOnInit(): void {
    this.types$ = this.companyTypeDataAccessor.fetch().pipe(
      map((types) => {
        return types.map((type) => ({
          key: type.companyTypeId,
          value: type.companyTypeId,
          label: type.companyTypeName,
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
