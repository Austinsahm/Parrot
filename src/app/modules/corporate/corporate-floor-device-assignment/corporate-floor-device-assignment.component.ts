import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, forkJoin, Observable, of, Subscription } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AssetHttpService } from "src/app/data-access/http/asset-http.service";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import {
  DeviceAccess,
  DeviceAttribute,
} from "src/app/data-access/models/company.model";
import { Device } from "src/app/data-access/models/device.model";
import { IiconData } from "src/app/data-access/models/device.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import {
  FloorDetails,
  FloorPlanDevice,
  FloorPlanDeviceIcon,
  FloorPlanDeviceSensor,
  SmartHomeDashboard,
  SmartHomeDevices,
} from "src/app/data-access/models/smartHome.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { FloorPlanService } from "src/app/services/floor-plan.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  deviceDashboardIconSet,
  changeAttributeValue,
} from "src/app/services/utilities";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";

interface AssetDevice {
  deviceId: string;
  manufDeviceId: string;
  deviceName: string;
}

@Component({
  selector: "app-corporate-floor-device-assignment",
  templateUrl: "./corporate-floor-device-assignment.component.html",
  styleUrls: ["./corporate-floor-device-assignment.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateFloorDeviceAssignmentComponent
  implements OnInit, OnDestroy
{
  smartHome$: Observable<{
    floor: ComboBoxOption<number>[];
    devices: SmartHomeDevices[][];
  }>;
  permission$: Observable<CorporatePermissionCategory>;
  private _assetDevices$ = new BehaviorSubject<FloorPlanDevice[]>([]);

  companyId: string;
  userId: string;
  assetId: string;
  floorIndex = 0;
  private assetDevices: Device[];
  searchAssetDevices: Device[];
  allAssetDevices: FloorPlanDevice[];
  assignedDevice: FloorPlanDevice;
  floorIds: string[];
  testPath: string =
    "M0,36V33H4V3A2.88,2.88,0,0,1,4.9.9,2.88,2.88,0,0,1,7,0H29a2.88,2.88,0,0,1,2.1.9A2.88,2.88,0,0,1,32,3V33h4v3Zm29-3V3H7V33ZM22.35,19.55a1.71,1.71,0,1,0-1.2-.5A1.64,1.64,0,0,0,22.35,19.55Z*M16,19a1.44,1.44,0,0,0,1.08-.45A1.51,1.51,0,0,0,15,16.42,1.52,1.52,0,0,0,16,19ZM7,35.5v-3l14-2.45V6.75a2,2,0,0,0-.38-1.22,1.48,1.48,0,0,0-1-.63L7,3V0L20.3,2.3A4.16,4.16,0,0,1,23,3.82,4.43,4.43,0,0,1,24,6.7V32.5Zm-7,0v-3H4V3A2.85,2.85,0,0,1,4.88.85,2.91,2.91,0,0,1,7,0H29a2.91,2.91,0,0,1,3,3V32.5h4v3Zm7-3H29V3L7,3Z";

  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  subscription: Subscription;

  constructor(
    private dashboardService: DashboardHttpService,
    private companyInfo: CompanyInfoService,
    private route: ActivatedRoute,
    private sessionService: SessionStorageService,
    private userInfo: UserInfoService,
    private assetService: AssetHttpService,
    private floorService: FloorPlanService,
    private companyInfoService: CompanyInfoService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.permission$ = this.sessionService.readPermission();
    this.companyId = this.companyInfo.getCompanyInfo().companyId;
    this.userId = this.userInfo.getUserInfo().userId;
    this.assetId = this.route.snapshot.paramMap.get("assetId");

    this.smartHome$ = this.assetService
      .fetchAssetDevices(this.companyId, this.assetId, this.userId)
      .pipe(
        switchMap((listDevices) => {
          //sidebar devices
          this.assetDevices = listDevices;

          return this.dashboardService
            .smartHomeDevice(this.companyId, this.assetId)
            .pipe(
              switchMap((res) => {
                //devices that belongs to a floor
                this.floorIds = res.map((el) => el.floorPlanId);
                const devices = res.map((devices) => devices.devices);
                const updateDevices = devices.map((el, i) => {
                  return el.map((dev) => {
                    let data = Object.assign({}, dev);
                    data.floorId = res[i].floorPlanId;
                    return data;
                  });
                });

                return this.loadDevicesonFloor(this.floorIds).pipe(
                  map((attachedDevices) => {
                    this._assetDevices$.next(attachedDevices);
                    this.searchAssetDevices = listDevices.filter(
                      (device) =>
                        !attachedDevices.some(
                          (el) =>
                            device.deviceId === el.deviceId && el.lat && el.lng
                        )
                    );

                    const smartHome = {
                      devices: updateDevices,
                      floor: res.map((floors, i) => ({
                        key: i.toString(),
                        value: i,
                        label: floors.floorName,
                      })),
                    };

                    return smartHome;
                  })
                );
              })
            );
        })
      );

    // this.assetService
    //   .fetchAssetDevices(this.companyId, this.assetId, this.userId)
    //   .subscribe((value) => {
    //     console.log(value);
    //     value.map((device, i) => {
    //       device.assetId = this.assetId;
    //       delete device.manufDeviceId;
    //     });
    //     this.searchAssetDevices = value;
    //     this.assetDevices = value;
    //     console.log(value, this.assetDevices);
    //   });
  }

  onFloorSelect(index: MatSelectChange) {
    this.subscription = this._assetDevices$.subscribe(
      (devices) => {
        this.floorIndex = index.value;
        this.searchAssetDevices = this.searchAssetDevices.filter(
          (device) =>
            !devices.some(
              (el) => device.deviceId === el.deviceId && el.lat && el.lng
            )
        );
      },
      () => {}
    );
  }

  loadDevicesonFloor(floorIds: string[]): Observable<FloorPlanDevice[]> {
    //create an observable based on floorids
    const floorDevices = floorIds.map((floorId) =>
      this.floorService.getDesignDevices(floorId)
    );
    return forkJoin(floorDevices).pipe(
      map((devices) => {
        // devices.forEach((el, i) => {
        //   if (el == null) {
        //     devices.splice(i, 1);
        //   }
        // });
        let actuals = devices.filter((v) => v);
        //convert the 2d array to 1d
        return [].concat(...actuals);
      })
    );
  }

  onDrop(evt: any, device: Device) {
    this.assignedDevice = device;
    this.assignedDevice.assetId = this.assetId;
    this.assignedDevice.sensorIcon = this.testPath;
    delete this.assignedDevice.manufDeviceId;

    // move to dropDeviceFromList()
    // this.searchAssetDevices = this.searchAssetDevices.filter(
    //   (each) =>
    //     !each.deviceId.toLowerCase().includes(device.deviceId.toLowerCase())
    // );
  }

  /**
   * splice device from list after dropping on floor plan
   * @param device
   */
  dropDeviceFromList(device: Device) {
    // delete device.sensorIcon
    this.searchAssetDevices = this.searchAssetDevices.filter(
      (each) =>
        !each.deviceId.toLowerCase().includes(device.deviceId.toLowerCase())
    );
  }

  /**
   * add device to list when dragged away from floor
   * @param device
   */
  returnDeviceToList(device: Device) {
    const returnDevice = this.assetDevices.find(
      (dev) => device.deviceId === dev.deviceId
    );

    if (returnDevice) this.searchAssetDevices.push(returnDevice);
  }

  availableDeviceSearch(event) {
    let deviceName: string = event.target.value ?? "";

    this.searchAssetDevices = this.searchAssetDevices.filter((each) =>
      each.deviceName.toLowerCase().includes(deviceName.toLowerCase())
    );
  }

  removing(event: any) {
    // console.log(event);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
