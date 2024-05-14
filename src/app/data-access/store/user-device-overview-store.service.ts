import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  throwError,
} from "rxjs";
import {
  catchError,
  filter,
  map,
  shareReplay,
  startWith,
  tap,
} from "rxjs/operators";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { CompanyHttpService } from "../http/company-http.service";
import {
  CompanyTypeCode,
  DeviceStat,
  UserStatType,
} from "../models/company.model";

// interface CompanyTypeData {
//   UserStatType: UserStatType[];
//   DeviceStat: DeviceStat;
// }

@Injectable({
  providedIn: "root",
})
export class UserDeviceOverviewStoreService {
  //store user and company in observable for persistence of data
  private companyData = new BehaviorSubject<any>(null);
  private partnerCompanyId = new BehaviorSubject<string>("");
  private unknownErr = new BehaviorSubject<string>("");

  companyOverview$: Observable<any[]> = this.companyData
    .asObservable()
    .pipe(filter((values) => values && values.length > 0)); //confirm that value exist
  customErr$ = this.unknownErr.asObservable();

  constructor(
    private companyHttpService: CompanyHttpService,
    private readonly userInfoService: UserInfoService,
    private toastService: ToastrService,
    private errMsg: ErrorMessageService
  ) {}

  getCompanyInfo(companyId: string) {    
    if (!this.companyData.getValue()) {
      const fetchUserStatStatus$ =
        this.companyHttpService.fetchUserStatStatus(companyId);
      const fetchAssetStat$ = this.companyHttpService.fetchAssetStat(companyId);
      const fetchLocationStat$ =
        this.companyHttpService.fetchLocationStat(companyId);
      const fetchDeviceStat$ =
        this.companyHttpService.fetchDeviceStat(companyId);
      const fetchUserStatType$ =
        this.companyHttpService.fetchUserStatType(companyId);

      forkJoin([
        fetchUserStatStatus$,
        fetchAssetStat$,
        fetchLocationStat$,
        fetchDeviceStat$,
        fetchUserStatType$,
      ])
        .pipe(
          tap((values) => {
            this.handleErrorArray(values[0], "User status not available");
            this.handleErrorArray(values[1], "Asset status not available");
            this.handleErrorArray(values[2], "Location status not available");

            if (values[3].numActive === null)
              this.errMsg.errorExist("Device status not available");
            if (values[4].length === 0)
              this.errMsg.errorExist("User status type not available");

            this.companyData.next(values);
            this.unknownErr.next("");
          })
        )
        // .subscribe({
        //   error: (error) => {
        //     if (!error.status)
        //       this.unknownErr.next("You might be offline ....Request Failed");
        //     else this.unknownErr.next("Unknown Error");
        //   },
        // });
    }
  }

   handleErrorArray(arr: any[], msg: string) {
    const filtered = arr?.filter(
      (u) => u?.label === "ACTIVE" || u?.label === "INACTIVE"
    );
    if (filtered[0]?.value === 0 && filtered[1]?.value === 0) {
      this.errMsg.errorExist(msg);
    }
  }
}
