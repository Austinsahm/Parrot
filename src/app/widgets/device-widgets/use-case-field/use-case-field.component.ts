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
import { Observable, Subject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { map, takeUntil } from "rxjs/operators";
import { UseCaseService } from "src/app/data-access/http/use-case.service";
import { AssetStoreService } from "src/app/data-access/store/asset-store.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-use-case-field",
  templateUrl: "./use-case-field.component.html",
  styleUrls: ["./use-case-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UseCaseFieldComponent),
      multi: true,
    },
  ],
})
export class UseCaseFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder = "Not Assigned";
  @Input() new: boolean = false;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();
  useCases$: Observable<ComboBoxOption<string>[]>;
  control = new FormControl("");
  private unsubscriber = new Subject();
  disabled: boolean;

  onChange = (value: string) => {};
  onTouched = () => {};

  constructor(private assetStore: AssetStoreService) {}

  ngOnInit(): void {
    this.assetStore.allUsecases();

    this.useCases$ = this.assetStore.usecases$.pipe(
      map((useCases) => {
        return useCases.map((useCase) => ({
          key: useCase.useCaseId,
          value: useCase.useCaseId,
          label: useCase.useCaseName,
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

  writeValue(value: string): void {
    this.control.setValue(value || "");
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event) {
    this.selectionChange.next(event);
  }
}