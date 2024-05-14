import { Component, OnInit } from "@angular/core";
import { TankAssetService } from "src/app/data-access/http/tank-asset.service";
import {
  FusionDataSource,
  TankAssetResp,
} from "src/app/data-access/models/asset.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { DataDetails } from "src/app/data-access/models/company.model";
import { CorporateLogsModalComponent } from "../corporate-logs-modal/corporate-logs-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-corporate-tank-level",
  templateUrl: "./corporate-tank-level.component.html",
  styleUrls: ["./corporate-tank-level.component.scss"],
})
export class CorporateTankLevelComponent implements OnInit {
  dataSources: FusionDataSource[] = [];
  data = [];
  tanksAsset$: Observable<TankAssetResp[]>;
  tanks$: Observable<any>;
  devices: DataDetails[] = [];

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    private tankAssetService: TankAssetService,
    private modal: NgbModal,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.tanks$ = this.tankAssetService.loadComapnyTankAssest().pipe(
      map((tanks, i) => {
        const assests= tanks.map((tank, i) => {
          const value = +tank.realTankLevel.split("=")[1];
          this.devices.push({
            deviceId: tank.deviceId,
            tab3: true,
            tab4: true,
            tab5: true,
            deviceName: tank.deviceName,
            manufDeviceId: tank.manufDeviceId,
            latitude: +tank.lat,
            longitude: +tank.lng,
          });
          return {
            max: tank.height,
            title: tank.deviceName,
            level: value,
            shape: i % 2 === 0 ? "Cylinder" : "Circle",
            color: i % 2 === 0 ? "green" : "red",
            tankId: tank.deviceId,
          };
        });
        console.log(assests);
        return assests
        
      })
    );

    let i = 0;
    this.tanksAsset$ = this.tankAssetService.loadComapnyTankAssest().pipe(
      map((data) => {
        for (let tank of data) {
          const value = +tank.realTankLevel.split("=")[1];
          if (!Number.isNaN(value)) {
            this.dataSources.push({
              chart: {
                theme: "fusion",
                caption: tank.deviceName,
                subcaption: tank.assetName,
                lowerLimit: "0",
                upperLimit: tank.height.toString(),
                lowerLimitDisplay: "Empty",
                upperLimitDisplay: "Full",
                numberSuffix: " mm",
                showValue: "1",
                // chartBottomMargin: "25",
                //Changing the Cylinder fill color
                cylFillColor: "#1aaf5d",
                cylFillHoverColor: "#00ff00",
                dataStreamUrl: `${environment.apiServerEndpoint}/asset/tank-level/device-id/${tank.deviceId}`,
                refreshInterval: "60",
                refreshInstantly: "1",
              },
              value: value.toString(),
            });

            this.data.push({
              max: tank.height,
              title: tank.deviceName,
              level: value,
              shape: i % 2 === 0 ? "Rectangle" : "Circle",
              tankId: tank.deviceId,
            });

            this.devices.push({
              deviceId: tank.deviceId,
              tab3: true,
              tab4: true,
              tab5: true,
              deviceName: tank.deviceName,
              manufDeviceId: tank.manufDeviceId,
              latitude: +tank.lat,
              longitude: +tank.lng,
            });
            i++;
          }
        }
        // this.dataSources = data.map((tank) => {
        //   const value = tank.realTankLevel.split("=")[1];
        //   return {
        //     chart: {
        //       theme: "fusion",
        //       caption: tank.deviceName,
        //       subcaption: tank.assetName,
        //       lowerLimit: "0",
        //       upperLimit: tank.totalVolume.toString(),
        //       lowerLimitDisplay: "Empty",
        //       upperLimitDisplay: "Full",
        //       numberSuffix: " ltrs",
        //       showValue: "1",
        //       // chartBottomMargin: "25",
        //       //Changing the Cylinder fill color
        //       cylFillColor: "#1aaf5d",
        //       cylFillHoverColor: "#00ff00",
        //       dataStreamUrl: `${environment.apiServerEndpoint}/asset/tank-level/device-id/${tank.deviceId}`,
        //       refreshInterval: "60",
        //       refreshInstantly: "1",
        //     },
        //     value,
        //   };
        // });
        // this.devices = data.map((el) => ({
        //   deviceId: el.deviceId,
        //   tab3: true,
        //   tab4: true,
        //   tab5: true,
        //   deviceName: el.assetName,
        //   manufDeviceId: el.assetId,
        //   latitude: 1,
        //   longitude: 1,
        // }));
        return data;
      })
    );
  }

  frontEndUpdate(evt) {
    let fuelVolume = 55;
    let gaugeRef = evt.eventObj.sender;

    gaugeRef.chartInterval = setInterval(function () {
      fuelVolume < 10 ? (fuelVolume = 110) : "";
      var consVolume = fuelVolume - Math.floor(Math.random() * 3);
      gaugeRef.feedData("&value=" + consVolume);
      fuelVolume = consVolume;
    }, 1000);
  }

  minimize() {
    // let device = this.devices[deviceIndex];
    // this.devices.splice(deviceIndex, 1, { ...device, isCollapsed: true });
  }

  maximize() {}

  dataDetails(device: number) {
    const modalRef = this.modal.open(CorporateLogsModalComponent, {
      size: "lg",
    });
    (modalRef.componentInstance as CorporateLogsModalComponent).device =
      this.devices[device];
  }
}

// chart: {
//   theme: "fusion",
//   caption: "Diesel Level in Generator",
//   subcaption: "Bakersfield Central",
//   lowerLimit: "0",
//   upperLimit: "120",
//   lowerLimitDisplay: "Empty",
//   upperLimitDisplay: "Full",
//   numberSuffix: " ltrs",
//   showValue: "1",
//   // dataStreamUrl:
//   //   "https://static.fusionch arts.com/sample/dev2.0/gauge-and-widgets-guide-cylinder-gauge-real-time-gauges-php-1.php",
//   // refreshInterval: "200",
//   // refreshInstantly: "1",
//   cylFillColor: "#ff00f5",
//   majorTMNumber: "4",
//   cylFillHoverColor: "#00ff00",
// },
