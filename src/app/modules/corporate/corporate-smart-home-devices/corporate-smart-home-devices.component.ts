import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import {
  DataDetails,
  DeviceAccess,
  DeviceAttribute,
} from "src/app/data-access/models/company.model";
import { IiconData } from "src/app/data-access/models/device.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import {
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
import { CorporateLogsModalComponent } from "../corporate-logs-modal/corporate-logs-modal.component";

interface DeviceAttr {
  attribute: string;
  attributeValue: string;
  icon: string[];
  color: string;
}

@Component({
  selector: "app-corporate-smart-home-devices",
  templateUrl: "./corporate-smart-home-devices.component.html",
  styleUrls: ["./corporate-smart-home-devices.component.scss"],
})
export class CorporateSmartHomeDevicesComponent implements OnInit {
  smartHome$: Observable<{
    floor: ComboBoxOption<number>[];
    devices: SmartHomeDevices[][];
    floorIds: String[];
  }>;
  permission$: Observable<CorporatePermissionCategory>;

  companyId: string;
  userId: string;
  floorIndex = 0;
  deviceAttr: DeviceAttr[];

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constDeviceAccessForm: DeviceAccess[] = [];
  spaceId: string[];
  customSpace: any = [];
  droppedDevice: FloorPlanDevice;
  // floorId: string = "92200166-54cf-4185-a33e-d53a81bbf2b3";
  floorIds = [
    "92200166-54cf-4185-a33e-d53a81bbf2b3",
    "d9b8f667-f746-4088-833f-dedfc6240ac3",
  ];

  constructor(
    private dashboardService: DashboardHttpService,
    private companyInfoService: CompanyInfoService,
    private route: ActivatedRoute,
    private sessionService: SessionStorageService,
    private userHttpService: UserHttpService,
    private userInfo: UserInfoService,
    private floorService: FloorPlanService,
    private cd: ChangeDetectorRef,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.permission$ = this.sessionService.readPermission();
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.userId = this.userInfo.getUserInfo().userId;
    const assetId = this.route.snapshot.paramMap.get("assetId");

    this.smartHome$ =
      // this.floorService.getTempToken().pipe(
      // switchMap((res: any) => {
      //   return this.floorService.getFloorIdsByAsset(
      //     assetId,
      //     res.response.authorization
      //   );
      // }),
      // switchMap((floors: FloorDetails) => {
      //   return
      this.dashboardService.smartHomeDevice(this.companyId, assetId).pipe(
        map((data) => {
          const devices = data.map((devices) => devices.devices);
          // const updateDevices = devices.map((el, i) => {
          //   return el.map((dev) => {
          //     let updateData = Object.assign({}, dev);
          //     updateData.floorId = data[i].floorPlanId;
          //     updateData.expanded = false;
          //     return updateData;
          //   });
          // });

          //display only devices that have position
          const updateDevice = devices.map((el, i) => {
            return el
              .filter((dev) => {
                if (
                  dev.position.lat &&
                  dev.position.lat !== "null" &&
                  dev.position.lng &&
                  dev.position.lng !== "null"
                ) {
                  return dev;
                }
              })
              .map((d) => {
                let updateDat = Object.assign({}, d);
                updateDat.floorId = data[i].floorPlanId;
                updateDat.expanded = false;
                return updateDat;
              });
          });

          const c = {
            devices: updateDevice,
            floorIds: data.map((id) => id.floorPlanId),
            floor: data.map((floors, i) => ({
              key: i.toString(),
              value: i,
              label: floors.floorName,
            })),
          };
          return c;
        })
        // map((devices, i) => {
        //   devices.devices[i][i].attributes.forEach((att) => console.log(att));
        //   return {devices:devices.devices, floor:devices.floor};
        // })
      );
    //   })
    // );
    // .subscribe();

    // this.smartHome$ = this.dashboardService
    //   .smartHomeDevice(this.companyId, assetId)
    //   .pipe(
    //     map((el) => {
    //       const devices = el.map((devices) => devices.devices);

    //       const updateDevices = devices.map((el, i) => {
    //         return el.map((dev) => {
    //           let data = Object.assign({}, dev);
    //           data.floorId = this.floorIds[i];
    //           return data;
    //         });
    //       });

    //       return {
    //         devices: updateDevices,
    //         floor: el.map((floors, i) => ({
    //           key: i.toString(),
    //           value: i,
    //           label: floors.floorName,
    //         })),
    //       };
    //     })
    //     // map((devices, i) => {
    //     //   devices.devices[i][i].attributes.forEach((att) => console.log(att));
    //     //   return {devices:devices.devices, floor:devices.floor};
    //     // })
    //   );

    // this.userHttpService
    //   .deviceAccessForm(this.companyId, this.userId)
    //   .subscribe((value) => {
    //     this.deviceAccessForm = value;
    //     this.constDeviceAccessForm = value;
    //   });
  }

  onFloorSelect(index: MatSelectChange) {
    this.floorIndex = index.value;
  }

  deviceAttributes(attr: DeviceAttribute[]) {
    this.deviceAttr = attr.map((each) => {
      const iconData = deviceDashboardIconSet(
        each.attribute,
        each.attributeValue
      );
      const formatName = changeAttributeValue(each);

      return {
        attribute: each.attribute,
        attributeValue: formatName,
        icon: iconData.icon,
        color: iconData.color,
      };
    });
  }

  toggle(index: number, devices: SmartHomeDevices[]) {
    devices[index].expanded = !devices[index].expanded;
    if (devices[index].expanded) {
      this.cd.detectChanges();
      this.deviceAttributes(devices[index].attributes);
    }
  }

  openDetails(device: FloorPlanDevice, att: DeviceAttr[]) {
    const longitude = att.find((el) => el.attribute === "Longitude");
    const latitude = att.find((el) => el.attribute === "Latitude");

    const viewDevice: DataDetails = {
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      manufDeviceId: device.manufDeviceId,
      tab3: true,
      tab4: true,
      tab5: true,
      longitude: +longitude.attributeValue,
      latitude: +latitude.attributeValue,
    };
    const modalRef = this.modal.open(CorporateLogsModalComponent, {
      size: "lg",
    });
    (modalRef.componentInstance as CorporateLogsModalComponent).device =
      viewDevice;
  }
}
