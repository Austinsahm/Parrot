import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Observable, Subscription, of } from "rxjs";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { Domain } from "src/app/data-access/models/domain.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import * as _moment from "moment";
import { ToastrService } from "ngx-toastr";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { map } from "rxjs/internal/operators/map";
import { DevicesStoreService } from "src/app/data-access/store/devices-store.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-device-report-form",
  templateUrl: "./device-report-form.component.html",
  styleUrls: ["./device-report-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceReportFormComponent implements OnInit, OnDestroy {
  @Input() company: Domain;
  readonly form: FormGroup;

  deviceIdOptions$: Observable<ComboBoxOption<string>[]>;

  fromCateg: string;
  formColor: string;
  formBgColor: string;
  formFont: string;
  moment = _moment;
  today: any;
  devCat: string;
  companyId: string;
  userId: string;

  selectable: boolean = true;

  subscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private dateHttp: DateHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private userStore: UsersStoreService,
    private devicesStore: DevicesStoreService,
    private userInfoService: UserInfoService
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.companyId = companyInfoService.getCompanyInfo().companyId;
    this.userId = this.userInfoService.getUserInfo().userId;

    this.today = new Date();

    this.form = this.fb.group({
      from: [""],
      to: [""],
      deviceId: ["", Validators.required],
      format: ["XLS", Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.userStore.defaultDateParams(this.company.companyId);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        this.form.patchValue({
          from: data.start_device_rep_date,
          to: data.end_date,
        });
      },
      () => {}
    );
  }

  changeDeviceId(e: MatSelectChange) {
    this.form.patchValue({ deviceId: e.value });
  }

  changeDeviceCategoryId(e: MatSelectChange) {
    this.devicesStore.loadAllDevicesDetailDirectoryList(
      this.userId,
      this.companyId
    );

    this.deviceIdOptions$ = this.devicesStore.devicesDetailDirectories$.pipe(
      map((devices) => {
        let foundDevices = devices.filter(
          (u) => u.clientDeviceCategId === e.value
        );
        return foundDevices.map((device) => ({
          key: device.deviceId,
          value: device.deviceId,
          label: device.manufDeviceId,
        }));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
