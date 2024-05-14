import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, of, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { CompanyDataAccessService } from "src/app/data-access/company-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { MatSelectChange } from "@angular/material/select";
import { CompanyStoreService } from "src/app/data-access/store/company-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-company-field",
  templateUrl: "./company-field.component.html",
  styleUrls: ["./company-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CompanyFieldComponent),
      multi: true,
    },
  ],
})
export class CompanyFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() set subdomain(value: string) {
    this.control.setValue("");
    this.options$ = this._createSourceObservable(value);
  }

  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable: boolean = false;
  @Input() defaultValue: string;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};

  formFontColor: string


  control = new FormControl("");
  options$: Observable<ComboBoxOption<string>[]>;
  private unsubscriber = new Subject();

  constructor(
    private readonly companyDataAccessor: CompanyDataAccessService,
    private companyStore: CompanyStoreService,    protected readonly companyInfoService: CompanyInfoService,

  ) {
    this.options$ = this._createSourceObservable();
    this.formFontColor=this.companyInfoService.getCompanyInfo().formFontColor;
  }

  ngOnInit(): void {
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

  private _createSourceObservable(
    subdomain?: string
  ): Observable<ComboBoxOption<string>[]> {
    if (!subdomain) {
      return of([]);
    }
    this.companyStore.companyList(subdomain);

    // return this.companyDataAccessor
    //   .getAccessor(subdomain)
    //   .fetch()
    return this.companyStore.companies$.pipe(
      map((companies) => {
        return companies.map((company) => ({
          key: company.companyId,
          value: company.companyId,
          label: company.companyName,
        }));
      })
    );
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
