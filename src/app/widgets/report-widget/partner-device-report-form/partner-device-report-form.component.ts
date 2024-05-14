import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ComboBoxOption } from "../../common-widgets/types";
import * as _moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { DevicesStoreService } from "src/app/data-access/store/devices-store.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { Domain } from "src/app/data-access/models/domain.model";
import { MatSelectChange } from "@angular/material/select";
import { map } from "rxjs/operators";

@Component({
  selector: "app-partner-device-report-form",
  templateUrl: "./partner-device-report-form.component.html",
  styleUrls: ["./partner-device-report-form.component.scss"],
})
export class PartnerDeviceReportFormComponent implements OnInit, OnDestroy {
  readonly form: FormGroup;
  @Input() company: Domain;

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
    this.form = this.fb.group({
      from: [""],
      to: [""],
      deviceCategory: [""],
      deviceId: ["", Validators.required],
      format: ["XLS", Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.userStore.defaultDateParams(this.company.companyId, true);

   this.subscription= this.userStore.defaultDate$.subscribe(
      (data) => {
        this.form.patchValue({
          from: data.start_billing_rep_date,
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
    this.subscription?.unsubscribe()
  }
}
