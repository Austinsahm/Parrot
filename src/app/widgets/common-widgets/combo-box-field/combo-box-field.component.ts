import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "../types";

@Component({
  selector: "app-combo-box-field",
  templateUrl: "./combo-box-field.component.html",
  styleUrls: ["./combo-box-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxFieldComponent),
      multi: true,
    },
  ],
})
export class ComboBoxFieldComponent<T>
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Output() onBlur: EventEmitter<void>;

  @Input() loading: boolean;
  @Input() loadingMessage: string;
  @Input() options: Array<ComboBoxOption<T>> = [];
  @Input() placeholder: string;
  @Input() emptyMessage: string;
  @Input() whiteLabel = false;
  @Input() defaultSelection;
  @Input() defaultOption?: ComboBoxOption<T>;

  private onChange = (value: T) => {};
  private onTouched = () => {};
  private unsubscriber = new Subject();

  formFont: string;
  formFontColor: string;
  formBgColor: string;

  control = new FormControl("");

  constructor(
    private toastService: ToastrService,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.onBlur = new EventEmitter<void>();
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.formFontColor = companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = companyInfoService.getCompanyInfo().formColor;
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: T) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  trackByFn(index: number, option: ComboBoxOption<T>): string {
    return option.key;
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  writeValue(value: T): void {
    this.control.setValue(value || "");
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log("here");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.defaultSelection && this.options?.length)
      this.defaultOption = this.options.find(
        (selected) => selected.key === this.defaultSelection
      );
  }
}
