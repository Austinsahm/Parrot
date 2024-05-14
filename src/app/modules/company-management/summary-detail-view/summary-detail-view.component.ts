import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompanyHttpService } from "src/app/data-access/http/company-http.service";
// import { map } from 'rxjs/operators';
import { LoadersCSS } from "ngx-loaders-css";
import { ToastrService } from "ngx-toastr";
import { CompanyInfoService } from "src/app/services/company-info.service";
import {
  PieDataType,
  UserStatType,
} from "src/app/data-access/models/company.model";
import { BehaviorSubject, Subscription, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Component({
  selector: "app-summary-detail-view",
  templateUrl: "./summary-detail-view.component.html",
  styleUrls: ["./summary-detail-view.component.scss"],
})
export class SummaryDetailViewComponent implements OnInit, OnDestroy {
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;
  chartColours: any;

  companyId: string;

  isLoading: boolean = true;

  userStatTypeCharts: UserStatType[] = [];
  // {attribute: string, xAxesValues: string[], yAxesValues: number[]}

  userStatStatusCharts: UserStatType[] = [];
  // {attribute: string, xAxesValues: string[], yAxesValues: number[]}

  assetStatCharts: UserStatType[] = [];
  // {attribute: string, xAxesValues: string[], yAxesValues: number[]}

  locationStatCharts: UserStatType[] = [];
  // {attribute: string, xAxesValues: string[], yAxesValues: number[]}

  deviceStatChart: PieDataType[] = [];
  // {attribute: string, labels: string[], values: number[]}

  loader: LoadersCSS = "line-spin-fade-loader";
  bgColor = "white";
  color = "rgba(100, 100, 100, 0.5)";

  customError = new BehaviorSubject<string>("");

  subscription: Subscription;

  constructor(
    private companyHttpService: CompanyHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private errMsg: ErrorMessageService
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.chartColours = [
      "#" + (this.primaryColour || "3D95F7"),
      "#" + (this.secondaryColour || "FAFA33"),
    ];
  }

  ngOnInit(): void {
    this.companyId = this.route.parent.snapshot.paramMap.get("companyId");
    this.withObservables();

    // this.fetchUserStatType();

    // this.fetchUserStatStatus();

    // this.fetchAssetStat();

    // this.fetchLocationStat();

    // this.fetchDeviceStat();
  }

  withObservables() {
    const fetchUserStatStatus$ = this.companyHttpService.fetchUserStatStatus(
      this.companyId
    );
    const fetchAssetStat$ = this.companyHttpService.fetchAssetStat(
      this.companyId
    );
    const fetchLocationStat$ = this.companyHttpService.fetchLocationStat(
      this.companyId
    );
    const fetchDeviceStat$ = this.companyHttpService.fetchDeviceStat(
      this.companyId
    );
    const fetchUserStatType$ = this.companyHttpService.fetchUserStatType(
      this.companyId
    );

    this.subscription = forkJoin([
      fetchUserStatStatus$,
      fetchAssetStat$,
      fetchLocationStat$,
      fetchDeviceStat$,
      fetchUserStatType$,
    ])
      .pipe(
        map((values) => {
          //fetchUserStatStatus response, first resp
          this.userStatStatusCharts = values[0]?.filter(
            (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
          );

          //assetStatCharts, second response
          this.assetStatCharts = values[1]?.filter(
            (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
          );
          if (
            this.assetStatCharts[0].value === 0 &&
            this.assetStatCharts[1].value === 0
          ) {
            this.assetStatCharts = [];
            this.errMsg.errorExist("Asset status not available");
          }

          //locationStatCharts, third element
          this.locationStatCharts = values[2]?.filter(
            (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
          );

          //deviceStatChart, fpurth element
          if (!values[3].numActive && values[3].numInActive === "0") {
            this.deviceStatChart = [];
            this.errMsg.errorExist("Devices status not available");
          } else {
            this.deviceStatChart = [
              {
                Value:
                  +values[3]?.numActive > 0
                    ? +values[3]?.numActive + 3
                    : +values[3]?.numActive,
                Label: `Active Devices`,
                Summary: `Active Devices: ${+values[3]?.numActive}`,
              },
              {
                Value:
                  +values[3]?.numInActive > 0
                    ? +values[3]?.numInActive + 3
                    : +values[3]?.numInActive,
                Label: `Inactive Devices`,
                Summary: `Inactive Devices: ${+values[3]?.numInActive}`,
              },
            ];
          }

          //userStatTypeCharts resp, last resp
          this.userStatTypeCharts = values[4];

          this.isLoading = false;
          this.customError.next("");
        })
      )
      .subscribe({
        error: (error) => {
          if (!error.status)
            this.customError.next("You might be offline ...Request Failed");
          else this.customError.next("Unknown Error");
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  fetchUserStatType() {
    this.companyHttpService.fetchUserStatType(this.companyId).subscribe(
      (value) => {
        this.userStatTypeCharts = value;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.userStatTypeCharts = [];
        this.toastService.error("Request Timed Out");
      }
    );
  }
  // let xaxis: string[] = [];
  // let yaxiz: number[] = [];
  // value.map(each => {
  //   xaxis.push(each.label);
  //   yaxiz.push(each.value);
  // })
  // this.userStatTypeCharts = {attribute: "User Type", xAxesValues: xaxis, yAxesValues: yaxiz}

  fetchUserStatStatus() {
    this.companyHttpService.fetchUserStatStatus(this.companyId).subscribe(
      (value) => {
        this.userStatStatusCharts = value?.filter(
          (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
        );
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.userStatStatusCharts = [];
        this.toastService.error("Request Timed Out");
      }
    );
  }
  // let xaxis: string[] = [];
  // let yaxiz: number[] = [];
  // value.map(each => {
  //   if(each.label == "ACTIVE" || each.label == "INACTIVE"){
  //     xaxis.push(each.label);
  //     yaxiz.push(each.value);
  //   }
  // })
  // this.userStatStatusCharts = {attribute: "User Status", xAxesValues: xaxis, yAxesValues: yaxiz}

  fetchAssetStat() {
    this.companyHttpService.fetchAssetStat(this.companyId).subscribe(
      (value) => {
        this.assetStatCharts = value?.filter(
          (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
        );
        if (
          this.assetStatCharts[0].value === 0 &&
          this.assetStatCharts[1].value === 0
        ) {
          this.assetStatCharts = [];
        }
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.assetStatCharts = [];
        this.toastService.error("Request Timed Out");
      }
    );
  }
  // let xaxis: string[] = [];
  // let yaxiz: number[] = [];
  // value.map(each => {
  //   if(each.label == "ACTIVE" || each.label == "INACTIVE"){
  //     xaxis.push(each.label);
  //     yaxiz.push(each.value);
  //   }
  // })
  // this.assetStatCharts = {attribute: "Asset", xAxesValues: xaxis, yAxesValues: yaxiz}

  fetchLocationStat() {
    this.companyHttpService.fetchLocationStat(this.companyId).subscribe(
      (value) => {
        this.locationStatCharts = value?.filter(
          (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
        );
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.locationStatCharts = [];
        this.toastService.error("Request Timed Out");
      }
    );
  }
  // let xaxis: string[] = [];
  // let yaxiz: number[] = [];
  // value.map(each => {
  //   if(each.label == "ACTIVE" || each.label == "INACTIVE"){
  //           xaxis.push(each.label);
  //           yaxiz.push(each.value);
  //         }
  //       })
  //       this.locationStatCharts = {attribute: "Location", xAxesValues: xaxis, yAxesValues: yaxiz}

  fetchDeviceStat() {
    this.companyHttpService.fetchDeviceStat(this.companyId).subscribe(
      (value) => {
        if (!value.numActive && value.numInActive === "0")
          return (this.deviceStatChart = []);
        this.deviceStatChart = [
          {
            Value: +value?.numActive,
            Label: `Active Devices`,
            Summary: `Active Devices: ${+value?.numActive}`,
          },
          {
            Value: +value?.numInActive,
            Label: `Inactive Devices`,
            Summary: `Inactive Devices: ${+value?.numInActive}`,
          },
        ];
        this.isLoading = false;
      },
      () => {
        this.deviceStatChart = [];
        this.toastService.error("Request Timed Out");
        this.isLoading = false;
      }
    );
  }
}
// this.deviceStatChart = {
//   attribute: "Devices",
//   labels: ['Active', 'Inactive'],
//   values: [Number(value.numActive), Number(value.numInActive)]
// }
