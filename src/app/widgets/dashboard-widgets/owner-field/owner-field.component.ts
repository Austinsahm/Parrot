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
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { MatSelectChange } from "@angular/material/select";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-owner-field",
  templateUrl: "./owner-field.component.html",
  styleUrls: ["./owner-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OwnerFieldComponent),
      multi: true,
    },
  ],
})
export class OwnerFieldComponent implements OnInit {
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

  constructor(
    private readonly userService: UserInfoService,
    private readonly dashboardHttpService: DashboardHttpService
  ) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });

    this.options$ = this.dashboardHttpService
      .dashboardOwnerList(this.userService.getUserInfo().userCompanyId)
      .pipe(
        map((users) => {
          return users.map((user) => ({
            key: user.userId,
            value: user.userId,
            label: user.firstName,
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
