import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  Output,
  OnDestroy,
  OnInit,
  EventEmitter,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { MatSelectChange } from "@angular/material/select";
import { StateDataAccessService } from "src/app/data-access/state-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-state-field",
  templateUrl: "./state-field.component.html",
  styleUrls: ["./state-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StateFieldComponent),
      multi: true,
    },
  ],
})
export class StateFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() new: boolean = false;
  @Input() defaultValue: string;

  @Input() set fromStateFn(value: string) {
    this.states$ = this.stateDataAccessor.fetch(value).pipe(
      map((states) => {
        return states.map((state) => ({
          key: state.stateid,
          value: state.stateid,
          label: state.stateName,
        }));
      })
    );
  }
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();

  disabled = false;

  control = new FormControl("");

  states$: Observable<ComboBoxOption<string>[]>;

  constructor(private readonly stateDataAccessor: StateDataAccessService) {}

  ngOnInit(): void {
    this.states$ = this.stateDataAccessor.fetch().pipe(
      map((states) => {
        return states.map((state) => ({
          key: state.stateid,
          value: state.stateid,
          label: state.stateName,
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
