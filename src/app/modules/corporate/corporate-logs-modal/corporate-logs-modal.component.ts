import { Component, Input, OnInit } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import {
  DataDetails,
  DeviceListStat,
} from "src/app/data-access/models/company.model";
import {
  HistoryData,
  LastStatus,
  sChartData,
} from "src/app/data-access/models/device-logs.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { map, mergeMap } from "rxjs/operators";
import { CompanyHttpService } from "src/app/data-access/http/company-http.service";
import { DeviceAttributeType } from "src/app/data-access/models/dashboard.model";
import { changeAttributeValue } from "src/app/services/utilities";

@Component({
  selector: "app-corporate-logs-modal",
  templateUrl: "./corporate-logs-modal.component.html",
  styleUrls: ["./corporate-logs-modal.component.scss"],
})
export class CorporateLogsModalComponent implements OnInit {
  @Input() device: DataDetails;

  formColor: string;
  formBgColor: string;
  formFont: string;
  companyId: string;
  primaryColour: string;
  secondaryColour: string;
  chartColours: any;

  @Input() loading: boolean;

  data: any[] = [];
  loadingSummaryData = true;

  lastStatusData: LastStatus[];
  loadingState: boolean = true;

  deviceHistoryData: HistoryData[];
  loadingHistory: boolean = true;

  singleData: any[];
  loadingSingle: boolean = true;

  staticChartsData: any[] = [];
  loadingStaticChartsData = true;
  // : {
  //   label: DeviceAttributeType | string;
  //   percentage: number;
  //   value: string;
  //   chartType: string;
  // }[];

  constructor(
    private activeModal: NgbActiveModal,
    protected readonly companyInfoService: CompanyInfoService,
    private dashboard: DashboardHttpService,
    private toastService: ToastrService,
    private dateService: DateHttpService,
    private companyHttpService: CompanyHttpService
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.companyId = companyInfoService.getCompanyInfo().companyId;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.chartColours = [
      "#" + (this.primaryColour || "3D95F7"),
      "#" + (this.secondaryColour || "FAFA33"),
    ];
  }

  ngOnInit(): void {
    this.lastStatus();
  }

  onTabChange(evt: MatTabChangeEvent) {
    if (evt.index === 0) {
      this.lastStatus();
    }
    if (evt.index === 1) {
      this.deviceHistory();
    }
    if (evt.index === 2) {
      if (this.device.tab4 || this.device.tab3) {
        this.multipleCharts();
      }
    }
    if (evt.index === 3) {
      this.singleChart();
    }
    if (evt.index === 4) {
      this.staticChart();
    }
  }

  lastStatus() {
    this.dashboard.latestDeviceLog(this.device.deviceId).subscribe(
      (logs) => {
        this.loadingState = false;
        if (logs.messages.length === 0) {
          this.lastStatusData = [];
          this.toastService.error("Device Last status not available");
        } else {
          const status = logs.messages[0].deviceLog.map((data, i) => {
            return data?.dataGroupAttributes?.map((val) => {
              return {
                data: val.attribute,
                value: changeAttributeValue(val),
                date: logs.messages[0].time,
              };
            });
          });
          if (status[0] === undefined && status[1] === undefined) {
            this.lastStatusData = [];
            this.toastService.error("Device data not vailable");
            // this.lastStatusData = [
            //   { data: "No data", value: "No Value", date: "No Date" },
            // ];
          } else if (status[0] === undefined) {
            this.lastStatusData = status[1];
          } else if (status[1] === undefined) {
            this.lastStatusData = status[0];
          } else
            this.lastStatusData = status?.reduce((prev, next) =>
              prev.concat(next)
            );
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
        this.activeModal.close();
      }
    );
  }

  deviceHistory() {
    this.dateService
      .defaultDatesParams(this.companyId)
      .pipe(
        mergeMap((defaultDate) => {
          return this.dashboard
            .DeviceLogHstory(
              this.device.deviceId,
              `${defaultDate[0].start_dashbd_date} 00:00:00`,
              `${defaultDate[0].end_date} 23:59:59`
            )
            .pipe(
              map((logs) => {
                return logs.messages.map((data) => {
                  if (data?.deviceLog.length === 1) {
                    const second = {
                      Date: data?.time,
                      "Sequence #": data?.seqNumber,
                      Type: data?.deviceLog[0]?.dataGroup,
                      Action:
                        data?.deviceLog[0]?.dataGroup === "Data"
                          ? data?.deviceLog[0]?.dataGroup
                          : "Atlas network position",
                      Data: data?.deviceLog[0].dataGroupAttributes.map(
                        (el) => ` ${el.attribute}: ${changeAttributeValue(el)}`
                      ),
                    };
                    return [second];
                  } else {
                    const msg = data?.deviceLog[0]?.dataGroupAttributes.splice(
                      0,
                      1
                    );
                    const first = {
                      Date: data?.time,
                      "Sequence #": data?.seqNumber,
                      Type: data?.deviceLog[0]?.dataGroup,
                      Action: msg[0]?.attribute,
                      Data: data?.deviceLog[0].dataGroupAttributes.map(
                        (el) => ` ${el.attribute}: ${changeAttributeValue(el)}`
                      ),
                    };
                    const second = {
                      Date: data?.time,
                      "Sequence #": data?.seqNumber,
                      Type: data?.deviceLog[1].dataGroup,
                      Action: "Atlas network position",
                      Data: data?.deviceLog[1].dataGroupAttributes.map(
                        (el) => ` ${el.attribute}: ${el.attributeValue}`
                      ),
                    };
                    return [first, second];
                  }
                });
              })
            );
        })
      )
      .subscribe(
        (data) => {
          this.loadingHistory = false;
          if (data.length === 0) {
            this.deviceHistoryData = [];
            this.toastService.error(
              "Device History not available at the moment"
            );
          } else {
            this.deviceHistoryData = data?.reduce((prev, next) => {
              return prev.concat(next);
            });
          }
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
          this.activeModal.close();
        }
      );
  }

  multipleCharts() {
    this.dateService
      .defaultDatesParams(this.companyId)
      .pipe(
        mergeMap((defaultDate) => {
          return this.dashboard.multiTimeChart(
            this.device.deviceId,
            `${defaultDate[0].start_dashbd_date} 00:00:00`,
            `${defaultDate[0].end_date} 23:59:59`
        );
        })
      )
      .subscribe(
        (mchart) => {
          if (!mchart.length) {
            this.data = [];
            this.loadingSummaryData = false;
            this.toastService.error(
              "Summarized chart not available at the moment"
            );
          } else {
            this.data = mchart;
            this.loadingSummaryData = false;
          }
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
          this.activeModal.close();
        }
      );
  }

  singleChart() {
    this.dateService
      .defaultDatesParams(this.companyId)
      .pipe(
        mergeMap((defaultDate) => {
          return this.dashboard
            .singleTimeChart(
              this.device.deviceId,
              this.companyId,
              `${defaultDate[0].start_dashbd_date} 00:00:00`,
              `${defaultDate[0].end_date} 23:59:59`
            )
            .pipe(
              map((value) => {
                this.singleData = value.map((each) => {
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
                this.loadingSingle = false;
              })
            );
        })
      )
      .subscribe({
        error(e) {
          if (!e.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
          this.activeModal.close();
        },
      });
  }

  staticChart() {
    this.dashboard.staticCharts(this.device.deviceId, this.companyId).subscribe(
      (data) => {
        if (!data.length) {
          this.staticChartsData = [];
          this.toastService.error("Static chart not available");
          this.loadingStaticChartsData = false;
        } else {
          this.staticChartsData = data.map((each) => ({
            ...this.convertStaticChart(
              each.minGaugeValue,
              each.maxGaugeValue,
              each.attribute,
              each.attributeValue
            ),
          }));
          this.loadingStaticChartsData = false;
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
        this.activeModal.close();
      }
    );
  }

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

  convertStaticChart(min: string, max: string, att: string, val: string) {
    const minVal = +min;
    const maxVal = +max;
    const valU = +val;
    return [
      {
        Label: `MAXIMUM ${att}`,
        Value: maxVal,
        Summary: `MAXIMUM ${att} ${maxVal}%`,
        title: att,
      },
      {
        Label: `MINIMUM ${att}`,
        Value: minVal,
        Summary: `MINIMUM ${att} ${minVal}%`,
        title: att,
      },
      {
        Label: `${att} VALUE`,
        Value: valU,
        Summary: `LAST ${att}`,
        title: `${att} - ${valU}`,
      },
    ];
  }

  close() {
    this.activeModal.close();
  }
}
