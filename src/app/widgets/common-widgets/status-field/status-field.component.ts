import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Observable, of, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { StatusDataAccessService } from "src/app/data-access/status-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-status-field",
  templateUrl: "./status-field.component.html",
  styleUrls: ["./status-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusFieldComponent),
      multi: true,
    },
  ],
})
export class StatusFieldComponent
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

  constructor(private readonly dataAccessor: StatusDataAccessService) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });

    this.options$ = this.dataAccessor.fetch().pipe(
      map((statuses) => {
        return statuses.map((status) => ({
          key: status.statusId,
          value: status.statusId,
          label: status.statusName,
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
