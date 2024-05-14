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
import { Observable, of, Subject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { map, takeUntil } from "rxjs/operators";
import { CompanyBranchDataAccessService } from "src/app/data-access/company-branch-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-branch-field",
  templateUrl: "./branch-field.component.html",
  styleUrls: ["./branch-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BranchFieldComponent),
      multi: true,
    },
  ],
})
export class BranchFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() set companyId(value: string) {
    this.control.setValue("");
    this.branches$ = this._createSourceObservable(value);
  }

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
  branches$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly branchDataAccessor: CompanyBranchDataAccessService
  ) {
    this.branches$ = this._createSourceObservable();
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  private _createSourceObservable(subdomain?: string) {
    if (!subdomain) {
      return of([]);
    }

    return this.branchDataAccessor
      .getAccessor(subdomain)
      .fetch()
      .pipe(
        map((branches) => {
          return branches.map((branch) => ({
            key: branch.locationId,
            value: branch.locationId,
            label: branch.locationName,
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
