import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbTimeAdapter, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import {
  ChartTypeEnum,
  DashboardDirectory,
  DeviceAttributeType,
} from "src/app/data-access/models/dashboard.model";
import { CompanyInfoService } from "src/app/services/company-info.service";

const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(":");
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10),
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null
      ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}`
      : null;
  }
}

@Component({
  selector: "app-corporate-view-dashboard",
  templateUrl: "./corporate-view-dashboard.component.html",
  styleUrls: ["./corporate-view-dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }],
})
export class CorporateViewDashboardComponent implements OnInit {
  temperaturePercent = 70;
  humidityPercent = -40;

  form: FormGroup;
  searchField = new FormControl("");
  dashboards$: Observable<DashboardDirectory[]> = of([]);
  companyId: string;
  showChart = false;
  showError: boolean = false;
  deviceName: string;
  manufDeviceId: string;
  deviceId: string;

  startTIme: string;
  stopTime: string;

  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  public readonly PIE = ChartTypeEnum.PIE;
  public readonly GAUGE = ChartTypeEnum.GAUGE;
  public readonly DOUGHNUT = ChartTypeEnum.DOUGHNUT;

  timeSeriesCharts: {
    attribute: string;
    xAxesValues: string[];
    yAxesValues: number[];
  }[] = [];
  staticCharts: {
    label: DeviceAttributeType | string;
    percentage: number;
    value: string;
    chartType: string;
  }[];

  private poolInterval;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dashboardHttpService: DashboardHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private dateHttp: DateHttpService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromTime: ["", Validators.compose([Validators.required])],
      toTime: ["", Validators.compose([Validators.required])],
      from: ["", Validators.compose([Validators.required])],
      to: ["", Validators.compose([Validators.required])],
    });

    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.dashboards$ = this.dashboardHttpService.fetchDashboardList(
      this.companyId
    );

    this.shortPooling();
  }

  ngOnDestroy() {
    clearInterval(this.poolInterval);
  }

  openDetails(entry: DashboardDirectory): void {
    this.dateHttp.defaultDatesParams(this.companyId).subscribe(
      (data) => {
        this.form.patchValue({
          from: data[0].start_dashbd_date,
          to: data[0].end_date,
          fromTime: "00:00:00",
          toTime: "11:59:59",
        });
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
    this.deviceId = entry.deviceId;
    this.deviceName = entry.deviceName;
    this.manufDeviceId = entry.manufDeviceId;
    this.showChart = true;
  }

  fetchCharts(): void {
    this.showError = this.form.invalid ? true : false;

    if (!this.showError) {
      this.startTIme = `${this.form.get("from").value} ${
        this.form.get("fromTime").value
      }`;

      this.stopTime = `${this.form.get("to").value} ${
        this.form.get("toTime").value
      }`;

      // this.startTIme = '2021-07-01 00:00:00';
      // this.stopTime = '2021-07-30 00:00:00';

      this.fetchTimeSeriesChart();

      this.fetchStaticChart();

      this.cd.detectChanges();
    }
  }

  convertTimeSeriesChartValue(
    xAxes: string,
    yAxes: string
  ): { xAxesValues: string[]; yAxesValues: number[] } {
    let xAxesValues = xAxes.split(",");

    let yAxesValues = yAxes.split(",").map((value) => Number.parseInt(value));

    return { xAxesValues, yAxesValues };
  }

  fetchStaticChart() {
    return this.dashboardHttpService
      .fetchStaticChart(this.deviceId, this.companyId)
      .subscribe(
        (value) => {
          this.staticCharts = value.map((each) => {
            if (each.attribute == DeviceAttributeType.HUMIDITY) {
              let percent =
                (Number(each.attributeValue) / Number(each.maxGaugeValue)) *
                100;

              let humidityData = {
                label: each.attribute,
                percentage: percent,
                value: each.attributeValue,
                chartType: each.charTypeName,
              };

              return humidityData;
            } else {
              let initial =
                Math.abs(Number(each.minGaugeValue)) +
                Number(each.attributeValue);

              let maxRange =
                Math.abs(Number(each.minGaugeValue)) +
                Math.abs(Number(each.maxGaugeValue));

              let percent = (initial / maxRange) * 100;

              if (each.attribute == DeviceAttributeType.CENTIGRADE) {
                let centData = {
                  label: each.attribute,
                  percentage: percent,
                  value: each.attributeValue,
                  chartType: each.charTypeName,
                };

                return centData;
              } else if (each.attribute == DeviceAttributeType.FAHRENHEIT) {
                let farData = {
                  label: each.attribute,
                  percentage: percent,
                  value: each.attributeValue,
                  chartType: each.charTypeName,
                };

                return farData;
              } else {
                let chartData = {
                  label: each.attribute,
                  percentage: percent,
                  value: each.attributeValue,
                  chartType: each.charTypeName,
                };

                return chartData;
              }
            }
          });
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );
  }

  fetchTimeSeriesChart() {
    return this.dashboardHttpService
      .fetchTimeSeriesChart(
        this.deviceId,
        this.companyId,
        this.startTIme,
        this.stopTime
      )
      .subscribe(
        (value) => {
          this.timeSeriesCharts = value.map((each) => ({
            attribute: each.attribute,
            ...this.convertTimeSeriesChartValue(
              each.devNetwkTime,
              each.attributeValue
            ),
          }));
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );
  }

  shortPooling(): void {
    this.poolInterval = setInterval(() => {
      if (this.startTIme && this.stopTime) {
        this.fetchTimeSeriesChart();

        this.fetchStaticChart();

        this.cd.detectChanges();
      }
    }, 5000);
  }
}
