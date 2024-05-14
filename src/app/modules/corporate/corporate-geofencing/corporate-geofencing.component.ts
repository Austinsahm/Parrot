import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { DevicesStoreService } from "src/app/data-access/store/devices-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";

@Component({
  selector: "app-corporate-geofencing",
  templateUrl: "./corporate-geofencing.component.html",
  styleUrls: ["./corporate-geofencing.component.scss"],
})
export class CorporateGeofencingComponent implements OnInit {
  permission$: Observable<CorporatePermissionCategory>;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  companyId: string;
  userId: string;

  taskOptions: ComboBoxOption<string>[];
  deviceIdOptions$: Observable<ComboBoxOption<string>[]>;
  geofenceNameOptions$: Observable<ComboBoxOption<string>[]>;

  showPanorama = false;
  panorama;
  togglePanoramaState = false;

  selectedTask = "search";
  deviceCategoryId: string;
  deviceId: string;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly dashboard: DashboardHttpService,
    private userInfoService: UserInfoService,
    private devicesStore: DevicesStoreService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.companyId = companyInfoService.getCompanyInfo().companyId;
    this.userId = this.userInfoService.getUserInfo().userId;

    this.taskOptions = [
      { key: "search", label: "Device Search", value: "search" },
      { key: "tracing", label: "Device Tracing", value: "tracing" },
      { key: "create", label: "Create Geofence", value: "create" },
    ];
  }

  ngOnInit(): void {}

  onGeofencingTask(task: string): void {
    this.selectedTask = task;
  }

  onDeviceCategory(id: string): void {
    this.deviceCategoryId = id;

    if (this.selectedTask === "search" || this.selectedTask === "tracing") {
      this.devicesStore.loadAllDevicesDetailDirectoryList(
        this.userId,
        this.companyId
      );
      this.deviceIdOptions$ = this.devicesStore.devicesDetailDirectories$.pipe(
        map((devices) => {
          let foundDevices = devices.filter(
            (u) => u.clientDeviceCategId === this.deviceCategoryId
          );
          return foundDevices.map((device) => ({
            key: device.deviceId,
            value: device.deviceId,
            label: device.manufDeviceId,
          }));
        })
      );

      // this.geofenceNameOptions$ = this.dashboard
      //   .geofencingHeader(this.deviceCategoryId)
      //   .pipe(
      //     map((names) => {
      //       return names.map((data) => ({
      //         key: data.geofencing_hder_id,
      //         value: data.geofencing_hder_id,
      //         label: data.geofencing_hder_name,
      //       }));
      //     }),
      //     map((data) => [data[0]])
      //   );
    }
  }

  onDeviceId(id: string) {
    this.deviceId = id;
  }
}
