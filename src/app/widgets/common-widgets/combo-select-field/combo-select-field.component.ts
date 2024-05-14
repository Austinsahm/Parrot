import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
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
import { MatSelectChange } from "@angular/material/select";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "../types";

@Component({
  selector: "app-combo-select-field",
  templateUrl: "./combo-select-field.component.html",
  styleUrls: ["./combo-select-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboSelectFieldComponent),
      multi: true,
    },
  ],
})
export class ComboSelectFieldComponent<T>
  implements OnInit, OnDestroy, ControlValueAccessor
{
  formFont: string;
  formFontColor: string;
  formBgColor: string;

  @Output() onBlur: EventEmitter<void>;

  @Input() loading: boolean;
  @Input() loadingMessage: string;
  @Input() options: Array<ComboBoxOption<T>> = [];
  @Input() defaultOption?: ComboBoxOption<T>;
  @Input() placeholder: string;
  @Input() emptyMessage: string;
  @Input() defaultSelection;
  @Input() whiteLabel = false;
  @Input() required = true;
  //  @Input() control: FormControl;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: T) => {};
  private onTouched = () => {};
  private unsubscriber = new Subject();

  selectedObj: any;
  control = new FormControl("");

  constructor(protected readonly companyInfoService: CompanyInfoService) {
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.formFontColor = companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = companyInfoService.getCompanyInfo().formColor;

    this.onBlur = new EventEmitter<void>();
  }

  ngOnInit(): void {
    // this.control.valueChanges
    //   .pipe(takeUntil(this.unsubscriber))
    //   .subscribe((value: T) => {
    //     console.log(value);
    //     this.onChange(value);
    //     this.onTouched();
    //   });
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

  setDisabledState?(isDisabled: boolean): void {}

  onSelectionChange(event) {
    this.selectionChange.next(event);
    this.defaultOption = this.options.find(
      (selected) => selected.key === event.value
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.defaultSelection && this.options?.length)
      this.defaultOption = this.options.find(
        (selected) => selected.key === this.defaultSelection
      );
  }
}
