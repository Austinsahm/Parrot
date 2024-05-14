import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DevicesStoreService } from "src/app/data-access/store/devices-store.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-dashboard-device-field",
  templateUrl: "./dashboard-device-field.component.html",
  styleUrls: ["./dashboard-device-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DashboardDeviceFieldComponent),
      multi: true,
    },
  ],
})
export class DashboardDeviceFieldComponent implements OnInit {
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable: boolean = false;

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  control = new FormControl("");
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dashboardHttpService: DashboardHttpService,
    private readonly userService: UserInfoService,
    private devicesStore: DevicesStoreService
  ) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });

    this.devicesStore.getAllDashboardDevicesList(
      this.userService.getUserInfo().userCompanyId
    );

    this.options$ = this.devicesStore.dashboardDevicesList$.pipe(
      map((devices) => {
        return devices.map((device) => ({
          key: device.deviceId,
          value: device.deviceId,
          label: device.manufDeviceId,
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
