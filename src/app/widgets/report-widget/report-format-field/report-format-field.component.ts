import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-report-format-field",
  templateUrl: "./report-format-field.component.html",
  styleUrls: ["./report-format-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReportFormatFieldComponent),
      multi: true,
    },
  ],
})
export class ReportFormatFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  private onChange = (value: string) => {};
  onTouched = () => {};

  disabled = false;

  control = new FormControl("XLS");
  unsubscriber = new Subject();

  readonly formats: Array<{ value: string; label: string }> = [
    { value: "XLS", label: "XLS" },
    { value: "PDF", label: "PDF" },
    { value: "CSV", label: "CSV" },
  ];

  groupName = window.performance.now().toString().replace(".", "_");

  constructor(private toastService: ToastrService) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  writeValue(value: string): void {
    this.control.setValue(value);
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
}
