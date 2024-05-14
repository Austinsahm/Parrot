import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { DashboardHttpService } from "../http/dashboard-http.service";
import { DashboardDevice } from "../models/dashboard.model";
import {
  DeviceConfigurationDirectory,
  DeviceDetail,
} from "../models/device.model";
import { DeviceNetwork } from "../models/network.model";

/**
 * Devices store management
 */
@Injectable({
  providedIn: "root",
})
export class DevicesStoreService {
  private dashboardDevices = new BehaviorSubject<DashboardDevice[]>([]);
  private devicesDetailDirectoryList = new BehaviorSubject<DeviceDetail[]>([]);
  private deviceNetworks = new BehaviorSubject<DeviceNetwork[]>([]);

  dashboardDevicesList$: Observable<DashboardDevice[]> =
    this.dashboardDevices.asObservable();
  devicesDetailDirectories$: Observable<DeviceDetail[]> =
    this.devicesDetailDirectoryList.asObservable();
  deviceNetworks$ = this.deviceNetworks.asObservable();

  companyType: string;

  constructor(
    private dashboardHttpService: DashboardHttpService,
    private errMsgService: ErrorMessageService,
    private userInfoService: UserInfoService,
  ) {
    this.getAllDeviceNetwork();
    this.companyType = userInfoService.getUserInfo().companyTypeName;
  }

  getAllDashboardDevicesList(companyId: string) {
    //check if data exist in behaviour subject
    if (this.dashboardDevices.getValue().length === 0) {
      this.dashboardHttpService
        .dashboardDeviceList(companyId)
        .pipe(
          tap((devices) => this.dashboardDevices.next(devices)),
          shareReplay(1)
        )
        .subscribe({ error: () => console.log("err") });
    }
  }

  loadAllDevicesDetailDirectoryList(userId: string, companyId: string) {
    //make request only if companyid is different
    //todo - creating a companyib bahviour subject
    if (
      this.companyType === "PARTNER" ||
      this.devicesDetailDirectoryList.getValue().length === 0
    ) {
      this.dashboardHttpService
        .deviceDetailsList(companyId, userId)
        .pipe(
          catchError((e) => {
            this.errMsgService.errorExist("Testing");
            return of([]);
          }),

          tap((lists) => this.devicesDetailDirectoryList.next(lists)),
          shareReplay(1)
        )
        .subscribe({ error: () => {} });
    }
  }

  getAllDeviceNetwork() {
    this.dashboardHttpService
      .deviceNetworks()
      .pipe(
        tap((networks) => this.deviceNetworks.next(networks)),
        shareReplay()
      )
      .subscribe({ error: () => {} });
  }
}
