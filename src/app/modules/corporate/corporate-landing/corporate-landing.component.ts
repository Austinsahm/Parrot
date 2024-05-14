import { Component, OnDestroy, OnInit } from "@angular/core";
import { stringToLocaleLower } from "igniteui-angular-core";
import { ToastrService } from "ngx-toastr";
import {
  BehaviorSubject,
  concat,
  forkJoin,
  Observable,
  Subscription,
} from "rxjs";
import { concatMap, map, mergeMap, retryWhen, tap } from "rxjs/operators";
import { CompanyHttpService } from "src/app/data-access/http/company-http.service";
import { UserDeviceOverviewStoreService } from "src/app/data-access/store/user-device-overview-store.service";
import {
  PieDataType,
  UserStatType,
} from "src/app/data-access/models/company.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Component({
  selector: "app-corporate-landing",
  templateUrl: "./corporate-landing.component.html",
  styleUrls: ["./corporate-landing.component.scss"],
})
export class CorporateLandingComponent implements OnInit, OnDestroy {
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;
  chartColours: any;

  companyId: string;

  userStatTypeCharts: UserStatType[] = [];

  userStatStatusCharts: UserStatType[] = [];

  assetStatCharts: UserStatType[] = [];

  locationStatCharts: UserStatType[] = [];

  deviceStatChart: PieDataType[] = [];

  isLoading: boolean = true;

  handleCustomErr$: Observable<string>;

  private unknownErr = new BehaviorSubject<string>("");

  subscription: Subscription;

  constructor(
    private companyHttpService: CompanyHttpService,
    private userDeviceOverview: UserDeviceOverviewStoreService,
    private readonly userInfoService: UserInfoService,
    private toastService: ToastrService,
    private readonly companyInfoService: CompanyInfoService,
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
    this.companyId = this.userInfoService.getUserInfo().userCompanyId;

    // this.userDeviceOverview.getCompanyInfo(this.companyId);

    // this.userDeviceOverview.companyOverview$
    //   .pipe(
    //     map((values) => {
    // //fetchUserStatStatus response, first resp
    // this.userStatStatusCharts = values[0]?.filter(
    //   (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
    // );

    // //assetStatCharts, second response
    // this.assetStatCharts = values[1]?.filter(
    //   (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
    // );
    // if (
    //   this.assetStatCharts[0].value === 0 &&
    //   this.assetStatCharts[1].value === 0
    // ) {
    //   this.assetStatCharts = [];
    // }

    // //locationStatCharts, third element
    // this.locationStatCharts = values[2]?.filter(
    //   (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
    // );

    // //deviceStatChart, fpurth element
    // if (!values[3].numActive && values[3].numInActive === "0") {
    //   this.deviceStatChart = [];
    // } else {
    //   this.deviceStatChart = [
    //     {
    //       Value: +values[3]?.numActive,
    //       Label: `Active Devices`,
    //       Summary: `Active Devices: ${+values[3]?.numActive}`,
    //     },
    //     {
    //       Value: +values[3]?.numInActive,
    //       Label: `Inactive Devices`,
    //       Summary: `Inactive Devices: ${+values[3]?.numInActive}`,
    //     },
    //   ];
    // }

    // //userStatTypeCharts resp, last resp
    // this.userStatTypeCharts = values[4];

    // this.isLoading = false;
    //     })
    //   )
    //   .subscribe();

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
        tap((values) => {
          this.userDeviceOverview.handleErrorArray(
            values[0],
            "User status not available"
          );
          this.userDeviceOverview.handleErrorArray(
            values[1],
            "Asset status not available"
          );
          this.userDeviceOverview.handleErrorArray(
            values[2],
            "Location status not available"
          );

          if (values[3].numActive === null)
            this.errMsg.errorExist("Device status not available");
          if (values[4].length === 0)
            this.errMsg.errorExist("User status type not available");
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
          }

          //locationStatCharts, third element
          this.locationStatCharts = values[2]?.filter(
            (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
          );

          //deviceStatChart, fpurth element
          if (!values[3].numActive && values[3].numInActive === "0") {
            this.deviceStatChart = [];
          } else {
            this.deviceStatChart = [
              {
                // display summary label for element greater than3
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

          this.unknownErr.next("");
        })
      )
      .subscribe({
        error: (error) => {
          if (!error.status)
            this.unknownErr.next("You might be offline ....Request Failed");
          else this.unknownErr.next("Unknown Error");
        },
      });

    this.handleCustomErr$ = this.unknownErr;
  }

  fetchUserStatType() {
    this.companyHttpService.fetchUserStatType(this.companyId).subscribe(
      (value) => {
        this.userStatTypeCharts = value;
        this.isLoading = false;
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
        this.userStatTypeCharts = [];
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  // value.map((each) => {
  //   xaxis.push(each.label.toUpperCase());
  //   yaxiz.push(each.value);
  // });
  // this.userStatTypeCharts = {
  //   attribute: "User Type",
  //   xAxesValues: xaxis,
  //   yAxesValues: yaxiz,
  // };

  fetchUserStatStatus() {
    this.isLoading = true;
    this.companyHttpService.fetchUserStatStatus(this.companyId).subscribe(
      (value) => {
        this.userStatStatusCharts = value?.filter(
          (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
        );
        this.isLoading = false;
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
        this.userStatStatusCharts = [];
        this.isLoading = false;
      }
    );
  }
  //   this.userStatStatusCharts = {
  //     attribute: "User Status",
  //     xAxesValues: xaxis,
  //     yAxesValues: yaxiz,
  //   };
  // });

  fetchAssetStat() {
    const retryLimit = 3;
    let attempt = 0;
    this.companyHttpService
      .fetchAssetStat(this.companyId)
      .pipe
      // retryWhen((err) =>
      //   err.pipe(
      //     tap((error) => {
      //       console.log('attempt', error.message);
      //       if (++attempt >= retryLimit) {
      //         throw error;
      //       }
      //     })
      //   )
      // )
      ()
      .subscribe(
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
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
          this.assetStatCharts = [];
          this.isLoading = false;
        }
      );
  }
  // value.map((each) => {
  //   if (each.label == "ACTIVE" || each.label == "INACTIVE") {
  //     xaxis.push(each.label);
  //     yaxiz.push(each.value);
  //   }
  // });
  // this.assetStatCharts = {
  //   attribute: "Asset",
  //   xAxesValues: xaxis,
  //   yAxesValues: yaxiz,
  // };

  fetchLocationStat() {
    this.companyHttpService.fetchLocationStat(this.companyId).subscribe(
      (value) => {
        this.locationStatCharts = value?.filter(
          (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
        );
        this.isLoading = false;
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
        this.locationStatCharts = [];
        this.isLoading = false;
      }
    );
  }
  // let xaxis: string[] = [];
  // let yaxiz: number[] = [];
  // value.map((each) => {
  //   if (each.label == "ACTIVE" || each.label == "INACTIVE") {
  //     xaxis.push(each.label);
  //     yaxiz.push(each.value);
  //   }
  // });
  // this.locationStatCharts = {
  //   attribute: "Location",
  //   xAxesValues: xaxis,
  //   yAxesValues: yaxiz,
  // };

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
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
        this.deviceStatChart = [];
        this.isLoading = false;
      }
    );
  }
}

// this.deviceStatChart = {
//   attribute: "Devices",
//   labels: ["Active", "Inactive"],
//   values: [Number(value.numActive), Number(value.numInActive)],
// };
