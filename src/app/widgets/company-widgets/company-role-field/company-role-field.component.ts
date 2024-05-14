import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { RoleAuthorizationHttpService } from "src/app/data-access/http/role-authorization-http.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-company-role-field",
  templateUrl: "./company-role-field.component.html",
  styleUrls: ["./company-role-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CompanyRoleFieldComponent),
      multi: true,
    },
  ],
})
export class CompanyRoleFieldComponent implements OnInit {
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable = false;

  @Input() set subdomain(value: string) {
    if (!value) return;
    this.options$ = this.roleAuthorizationService
      .fetch(value)
      .pipe(
        map((roles) =>
          roles.map((role) => ({
            key: role.roleId,
            value: role.roleId,
            label: role.roleName,
          }))
        )
      );
  }

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl("");
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly userService: UserInfoService,
    private readonly dashboardHttpService: DashboardHttpService,
    private roleAuthorizationService: RoleAuthorizationHttpService
  ) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });

    this.options$ = this.roleAuthorizationService
      .fetch()
      .pipe(
        map((roles) =>
          roles.map((role) => ({
            key: role.roleId,
            value: role.roleId,
            label: role.roleName,
          }))
        )
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
