import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoadersCSS } from "ngx-loaders-css";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { CompanyHttpService } from "src/app/data-access/http/company-http.service";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import {
  DataDetails,
  DeviceAttribute,
  DeviceListStat,
  StaticChartValue,
  TimeSeriesChartValue,
} from "src/app/data-access/models/company.model";
import {
  ChartTypeEnum,
  DeviceAttributeType,
} from "src/app/data-access/models/dashboard.model";
import {
  DeviceAttributeStatus,
  DeviceNetwork,
  DeviceStatus,
  IiconData,
  WirelessStatus,
} from "src/app/data-access/models/device.model";
import { ErrorResponse } from "src/app/data-access/models/http.model";
import { DevicesStoreService } from "src/app/data-access/store/devices-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  changeAttributeValue,
  deviceDashboardIconSet,
} from "src/app/services/utilities";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";
import { CorporateLogsModalComponent } from "../corporate-logs-modal/corporate-logs-modal.component";
import { Location } from "@angular/common";

@Component({
  selector: "app-corporate-device-landing",
  templateUrl: "./corporate-device-landing.component.html",
  styleUrls: ["./corporate-device-landing.component.scss"],
})
export class CorporateDeviceLandingComponent implements OnInit {
  public readonly PIE = ChartTypeEnum.PIE;
  public readonly GAUGE = ChartTypeEnum.GAUGE;
  public readonly DOUGHNUT = ChartTypeEnum.DOUGHNUT;

  public readonly LINE = ChartTypeEnum.LINE;
  public readonly BAR = ChartTypeEnum.BAR;

  active = 1;

  companyId: string;

  isLoading: boolean = true;

  devices: DeviceListStat[];

  devicesConst: DeviceListStat[];

  staticCharts: any[];
  // {
  //   label: DeviceAttributeType | string;
  //   percentage: number;
  //   value: string;
  //   chartType: string;
  // }[];

  timeSeriesCharts: {
    attribute: string;
    chartType: string;
    xAxesValues: string[];
    yAxesValues: number[];
  }[] = [];
  singleData: any[];
  loadingSingle: boolean = false;

  public locationData: { lat: number; lng: number }[];

  public markerIcon: string;

  summaryForm: FormGroup;

  todayDate: string;

  categoryList: { value: string; label: string; disabled: boolean }[] = [];

  isCollapsedAll = false;

  loader: LoadersCSS = "line-spin-fade-loader";
  bgColor: string;
  color = "rgba(100, 100, 100, 0.5)";
  cardText:string

  selectable: boolean = true;

  userId: string;
  devCat: string;
  deviceId: string;
  devStatus: string;
  deviceIdOptions$: Observable<ComboBoxOption<string>[]>;
  statusList = [
    { key: "ACTIVE", value: "ACTIVE", label: "Active" },
    { key: "INACTIVE", value: "INACTIVE", label: "Inactive" },
    { key: "ALL", value: "ALL", label: "All" },
  ];
  devNetw: string;

  searchMode: boolean = false;

  isFiltering: boolean = false;
  primaryColour: string;
  secondaryColour: string;
  useCaseId: string;
  chartColours: any;

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    private companyHttpService: CompanyHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private userInfoService: UserInfoService,
    private readonly dashboardHttpService: DashboardHttpService,
    private readonly formBuilder: FormBuilder,
    private modal: NgbModal,
    private toastrService: ToastrService,
    private companyInfoService: CompanyInfoService,
    private devicesStore: DevicesStoreService,
    private location: Location
  ) {
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.chartColours = [
      "#" + (this.primaryColour || "3D95F7"),
      "#" + (this.secondaryColour || "FAFA33"),
    ];
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.cardText = this.formBgColor==='#ffffff'?'#000000':this.formBgColor
  }

  ngOnInit(): void {
    this.useCaseId = this.route.snapshot.paramMap.get("id");
    this.companyId = this.userInfoService.getUserInfo().userCompanyId;
    this.fetchDeviceDetail();

    this.summaryForm = this.formBuilder.group({
      day: [5, [Validators.required]],
      deviceCatg: ["", []],
      manufDeviceId: ["", []],
      status: ["ALL", []],
    });

    this.todayDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    this.userId = this.userInfoService.getUserInfo().userId;
  }

  changeDeviceCategoryId(event) {
    this.devCat = event.value;

    this.devicesStore.loadAllDevicesDetailDirectoryList(
      this.userId,
      this.companyId
    );
    this.deviceIdOptions$ = this.devicesStore.devicesDetailDirectories$.pipe(
      map((devices) => {
        let foundDevices = devices.filter(
          (u) => u.clientDeviceCategId === this.devCat
        );
        return foundDevices.map((device) => ({
          key: device.deviceId,
          value: device.deviceId,
          label: device.manufDeviceId,
        }));
      })
    );
  }

  changeDeviceId(e) {
    this.deviceId = e.value;
  }

  changeStatus(e) {
    this.devStatus = e.value;
  }

  changeNetwork(e) {
    this.devNetw = e.value;
  }

  networkLogo(network: string) {
    switch (network.toLowerCase()) {
      case WirelessStatus.SIGFOX:
        return "assets/images/sigfox-logo.ico";
      case WirelessStatus.LORA:
        return "assets/images/lora.png";
      case WirelessStatus.NB:
        return "assets/images/nb_iot.png";
    }
  }

  fetchDeviceDetail(day = 5) {
    if (this.useCaseId === "ALL") {
      this.useCaseId = "999999";
    }

    this.companyHttpService
      .fetchDeviceStatDetail(this.companyId, this.useCaseId, day)
      .subscribe(
        (value) => {
          this.devices = value.map((each, index) => {
            // let dash0 = each?.itemList.filter((dash) => dash.showInDashbd == "0");

            // let dash1 = each?.itemList.filter((dash) => dash.showInDashbd == "1");

            let attributeList = [];
            let tab3,
              tab4,
              tab5 = false;
            let latitude, longitude;

            // if (dash0.length) {
            //   let iconData: IiconData = { color: "", icon: [] };

            //   dash0 = dash0.map((e) => {
            //     iconData = deviceDashboardIconSet(e.attribute, e.attributeValue);

            //     return {
            //       ...e,
            //       deviceIcon: iconData.icon,
            //       iconColor: iconData.color,
            //     };
            //   });

            //   attributeList.push({
            //     icon: ["fas", "tachometer-alt"],
            //     type: "dashboard0",
            //     data: dash0,
            //   });
            // }

            // if (dash1.length)
            //   attributeList.push({
            //     icon: ["fas", "list"],
            //     type: "dashboard1",
            //     data: dash1,
            //   });

            if (each?.tab1.length) {
              let iconData: IiconData = { color: "", icon: [] };
              const dash0 = each?.tab1.map((each) => {
                iconData = deviceDashboardIconSet(
                  each?.attribute,
                  each?.attributeValue
                );

                return {
                  ...each,
                  deviceIcon: iconData.icon,
                  iconColor: iconData.color,
                };
              });
              attributeList.push({
                icon: ["fas", "tachometer-alt"],
                type: "dashboard0",
                data: dash0,
              });
            }

            if (each?.tab2.length) {
              const dash1 = each?.tab2.map((each) => {
                return { ...each };
              });
              attributeList.push({
                icon: ["fas", "list"],
                type: "dashboard1",
                data: dash1,
              });
            }

            if (each?.tab3.length) {
              this.staticCharts = each?.tab3.map((each) => {
                return [
                  {
                    title: `${each?.attribute} - ${+each?.maxGaugeValue}`,
                    Value: +each?.maxGaugeValue,
                  },
                  {
                    title: `${each?.attribute} - ${+each?.minGaugeValue}`,
                    Value: +each?.minGaugeValue,
                  },
                  {
                    title: `${each?.attribute} - ${+each?.attributeValue}`,
                    Value: +each?.attributeValue,
                  },
                ];
                // if (each?.attribute == DeviceAttributeType.HUMIDITY) {
                //   let percent =
                //     (Number(each?.attributeValue) / Number(each?.maxGaugeValue)) *
                //     100;

                //   let humidityData = {
                //     label: each?.attribute,
                //     percentage: percent,
                //     value: each?.attributeValue,
                //     chartType: each?.charTypeName,
                //   };

                //   return humidityData;
                // } else {
                //   let initial =
                //     Math.abs(Number(each?.minGaugeValue)) +
                //     Number(each?.attributeValue);

                //   let maxRange =
                //     Math.abs(Number(each?.minGaugeValue)) +
                //     Math.abs(Number(each?.maxGaugeValue));

                //   let percent = (initial / maxRange) * 100;

                //   if (each?.attribute == DeviceAttributeType.CENTIGRADE) {
                //     let centData = {
                //       label: each?.attribute,
                //       percentage: percent,
                //       value: each?.attributeValue,
                //       chartType: each?.charTypeName,
                //     };

                //     return centData;
                //   } else if (each?.attribute == DeviceAttributeType.FAHRENHEIT) {
                //     let farData = {
                //       label: each?.attribute,
                //       percentage: percent,
                //       value: each?.attributeValue,
                //       chartType: each?.charTypeName,
                //     };

                //     return farData;
                //   } else {
                //     let chartData = {
                //       label: each?.attribute,
                //       percentage: percent,
                //       value: each?.attributeValue,
                //       chartType: each?.charTypeName,
                //     };

                //     return chartData;
                //   }
                // }
              });
              tab3 = true;
              attributeList.push({
                icon: ["fas", "chart-pie"],
                type: "static",
                data: this.staticCharts,
              });
            }

            if (each?.tab4.length) {
              this.singleData = each?.tab4.map((each) => {
                return {
                  // attribute: each?.attribute,
                  // chartType: each?.charTypeName,
                  ...this.convertTimeSeriesChartValue(
                    each?.devNetwkTime,
                    each?.attributeValue,
                    each?.attribute
                  ),
                };
              });

              tab4 = true;
              attributeList.push({
                icon: ["fas", "chart-line"],
                type: "timeSeries",
                data: this.singleData,
              });
            }

            if (each?.tab5.deviceId) {
              this.locationData = each?.tab5.location.map((each) =>
                this.processLocation(each)
              );

              tab5 = true;
              attributeList.push({
                icon: ["fas", "map-marked-alt"],
                type: "assetTracker",
                data: { showMap: true, locationData: this.locationData },
              });

              // this.dashboardHttpService.getSpecificMarkerIcon(each?.tab5.markerIconId).subscribe(marker => {
              //       // this.markerIcon = marker.iconImage;
              //       // this.showMap = true;
              //       attributeList.push({icon: ['fas', 'map-marked-alt'], data: {showMap: true, markerIcon: marker.iconImage, locationData: this.locationData}})
              //       this.cd.detectChanges();
              //       // map-marked-alt'  map-marker-alt
              //   }
              // )
            }

            if (each?.tab6) {
              latitude = Number(each?.tab6.latitude);
              longitude = Number(each?.tab6.longitude);
              // this.dashboardHttpService
              //   .fetchDeviceGeolocationAddress(latitude, longitude)
              //   .subscribe((result) => {
              //     let addressResponse = result?.results[0]?.locations[0];
              //     let address = `${addressResponse?.street}, ${addressResponse?.adminArea5}, ${addressResponse?.adminArea1}.`;

              //     attributeList.push({
              //       icon: ["fas", "map-marker-alt"],
              //       type: "geolocation",
              //       data: { showMap: true, address, latitude, longitude, container:index },
              //     });

              //   });

              attributeList.push({
                icon: ["fas", "map-marker-alt"],
                type: "geolocation",
                data: { showMap: true, latitude, longitude, container: index },
              });
            }

            if (each?.tab7) {
              let data: {
                message: string;
                alertInitTime: string;
                alertCurTime: string;
                alertAck: string;
                actionTaken: string;
              }[] = [];

              if (each?.tab7.length) {
                data = each?.tab7.map((alert) => ({
                  message: alert.message,
                  alertInitTime: alert.alertInitTime,
                  alertCurTime: alert.alertCurTime,
                  alertAck: alert.alertAck === "Y" ? "YES" : "NO",
                  actionTaken: alert.actionTaken === "Y" ? "YES" : "NO",
                }));
              }

              attributeList.push({
                icon: ["fas", "bell"],
                type: "alert",
                data,
              });
            }

            return {
              deviceId: each?.deviceId,
              deviceName: each?.deviceName,
              manufDeviceId: each?.manufDeviceId,
              lastSeenDate: each?.lastSeenDate,
              attributeList: attributeList,
              companyName: each?.companyName,
              deviceStatus: each?.deviceStatus,
              clientDeviceCategId: each?.clientDeviceCategId,
              isCollapsed: false,
              deviceCategName: each?.deviceCategName,
              subscrValid: each?.subscrValid === "Y" ? true : false,
              device: {
                deviceId: each?.deviceId,
                tab3,
                tab4,
                tab5,
                deviceName: each?.deviceName,
                manufDeviceId: each?.manufDeviceId,
                latitude,
                longitude,
              },
              network: each?.network,
              network_name: each?.network_name,
            };
          });

          this.devicesConst = [...this.devices];

          let categories = [
            ...this.devices.map((each) => ({
              value: each?.clientDeviceCategId,
              label: each?.deviceCategName,
              disabled: false,
            })),
          ];

          let categoriesArr: [
            string,
            { value: string; label: string; disabled: boolean }
          ][] = categories.map((each) => [JSON.stringify(each), each]);

          this.categoryList = Array.from(new Map([...categoriesArr]).values());

          this.isLoading = false;
          this.searchMode = false;
          this.isFiltering = false;
        },
        (error) => {
          if (error.message === ErrorResponse.NOT_FOUND)
            this.toastrService.error(error.message);
          else this.toastrService.error("Request Timed Out");
          this.router.navigateByUrl("corporate");
        }
      );
  }

  filterDevices = () => {
    if (!this.devCat && !this.deviceId && !this.devStatus && !this.devNetw) {
      return;
    }
    if (!this.devStatus) {
      this.devStatus = "ALL";
    }
    if (!this.devNetw) {
      this.devNetw = "ALL";
    }
    const clientDeviceCategId = this.devCat;
    const manufDeviceId = this.deviceId;
    const deviceStatus = this.devStatus;
    const network = this.devNetw;

    this.devices = [...this.devicesConst];

    let filter = { clientDeviceCategId, manufDeviceId, deviceStatus, network };
    if (deviceStatus === "" || deviceStatus === "ALL")
      delete filter.deviceStatus;
    if (clientDeviceCategId === undefined) delete filter.clientDeviceCategId;
    if (manufDeviceId === undefined) delete filter.manufDeviceId;
    if (network === "" || network === "ALL") delete filter.network;

    this.devices = this.devicesConst.filter((each) => {
      for (let key in filter) {
        if (each[key] === undefined || each[key] != filter[key]) return false;
      }
      return true;
    });

    // if()

    // if (netw !== DeviceNetwork.ALL) {
    //   console.log(this.devices, 'network');

    //   this.devices = [...this.devices.filter(
    //     (each) => each?.network === netw
    //   )]
    // }
    // console.log(deviceCatg, manufDeviceId, status);

    // if (deviceCatg && deviceCatg !== "ALL") {
    //   console.log('device', this.devices);

    //   this.devices = [...this.devices.filter(
    //     (each) => each?.clientDeviceCategId === deviceCatg
    //   )]
    // }

    // if (manufDeviceId) {
    //   console.log('manuf', this.devices);

    //   this.devices = [...this.devices.filter(
    //     (each) =>
    //       each?.manufDeviceId.toLowerCase() === manufDeviceId.toLowerCase()
    //   )]
    // }

    // if (status !== DeviceStatus.ALL) {
    //   console.log('status', this.devices);

    //   this.devices = [...this.devices.filter(
    //     (each) => each?.deviceStatus === status
    //   )]
    // }
    // this.devices.filter(
    //   (each) => each?.network === netw
    // );

    this.searchMode = true;
  };

  reset() {
    this.devices = [...this.devicesConst];
    this.searchMode = false;
  }

  changeStaticChartType = (
    chartName: string,
    deviceIndex: number,
    attributeIndex: number
  ) => {
    let charts: StaticChartValue[] = this.devices[deviceIndex].attributeList[
      attributeIndex
    ].data as StaticChartValue[];

    let chartsUpdate = charts.map((each) => {
      return { ...each, chartType: chartName.toLowerCase() };
    });

    this.devices[deviceIndex].attributeList[attributeIndex].data = chartsUpdate;
  };

  changeTimeSeriesChartType = (
    chartName: string,
    deviceIndex: number,
    attributeIndex: number
  ) => {
    let charts = this.devices[deviceIndex].attributeList[attributeIndex]
      .data as TimeSeriesChartValue[];

    let chartsUpdate = charts.map((each) => {
      return { ...each, chartType: chartName.toLowerCase() };
    });

    this.devices[deviceIndex].attributeList[attributeIndex].data = chartsUpdate;
  };

  convertTimeSeriesChartValue(xAxes: string, yAxes: string, yValue: string) {
    let xAxesValues = xAxes.split(",");

    let yAxesValues = yAxes.split(",").map((value, i) => {
      return {
        [yValue]: Number.parseInt(value) === NaN ? 0 : Number.parseInt(value),
        time: xAxesValues[i],
        attribute: yValue,
      };
    });

    return yAxesValues;
  }

  processLocation = (data: string) => {
    let parsedData = JSON.parse(data);
    return { lat: parsedData[0], lng: parsedData[1] };
  };

  submit() {
    this.isFiltering = true;
    const day = this.summaryForm.get("day").value;

    this.devices = [];

    this.fetchDeviceDetail(day);
  }

  minimize(deviceIndex: number) {
    let device = this.devices[deviceIndex];

    this.devices.splice(deviceIndex, 1, { ...device, isCollapsed: true });
  }

  maximize(deviceIndex: number) {
    let device = this.devices[deviceIndex];

    this.devices.splice(deviceIndex, 1, { ...device, isCollapsed: false });
  }

  settings(e) {}

  dataDetails(device: DataDetails) {
    const modalRef = this.modal.open(CorporateLogsModalComponent, {
      size: "lg",
    });
    (modalRef.componentInstance as CorporateLogsModalComponent).device = device;
  }

  toggleMaximizeAll() {
    let devices = this.devices.map((each) => ({
      ...each,
      isCollapsed: !this.isCollapsedAll,
    }));
    this.devices = [...devices];
    this.isCollapsedAll = !this.isCollapsedAll;
  }
  back() {
    this.location.back();
  }

  changeAttributeName(att: DeviceAttribute): string {
    return changeAttributeValue(att);
  }
}
