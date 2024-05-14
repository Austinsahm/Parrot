import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-date-field",
  templateUrl: "./date-field.component.html",
  styleUrls: ["./date-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true,
    },
  ],
})
export class DateFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @ViewChild("dateField") dateField: ElementRef<HTMLInputElement>;

  @Input() placeholder: string;
  @Input() min: NgbDateStruct;
  @Input() max: NgbDateStruct;
  @Input() endDate: boolean;
  @Input() startDate: boolean;
  @Input() new: boolean = false;

  minDate: NgbDateStruct;

  maxDate;

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl("");
  rawValue: NgbDateStruct;

  constructor() {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: NgbDateStruct) => {
        this.rawValue = value;
        this.onChange(this.dateToStr(value));
        if (value) {
          this.onTouched();
        }
      });
  }

  private strToDate(dateStr?: string): NgbDateStruct {
    if (!dateStr) {
      return null;
    }

    try {
      const date = new Date(dateStr);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };
    } catch (error) {
      return null;
    }
  }

  private dateToStr(date?: NgbDateStruct): string {
    return date
      ? `${date.year}-${date.month.toString().padStart(2, "0")}-${date.day
          .toString()
          .padStart(2, "0")}`
      : null;
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  writeValue(value: string): void {
    this.control.setValue(this.strToDate(value));
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
