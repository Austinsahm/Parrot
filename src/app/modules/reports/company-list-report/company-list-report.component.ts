import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Domain } from "src/app/data-access/models/domain.model";
import {
  CompanyListReportEntry,
  CompanyListReportFilter,
} from "src/app/data-access/models/report.model";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { ReportDataAccessorService } from "src/app/data-access/report-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { DateService } from "src/app/services/date.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { Router } from "@angular/router";
import * as _moment from "moment";
import { FormGroup } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { ToastrService } from "ngx-toastr";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";

@Component({
  selector: "app-company-list-report",
  templateUrl: "./company-list-report.component.html",
  styleUrls: ["./company-list-report.component.scss"],
})
export class CompanyListReportComponent implements OnInit, OnDestroy {
  company: Domain;
  subdomain: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  companyId: string;
  primaryColour: string;

  moment = _moment;

  report$: Observable<CompanyListReportEntry[]>;
  inFilterMode = true;
  permission$: Observable<PartnerPermissionCategory>;
  subscription: Subscription;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportDataAccessor: ReportDataAccessorService,
    private sessionService: SessionStorageService,
    private dateHttp: DateHttpService,
    private userInfoService: UserInfoService,
    private readonly router: Router,
    private toastService: ToastrService,
    private userStore: UsersStoreService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();

    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
  }

  cancelHandler(form: FormGroup, filters: CompanyListReportFilter): void {
    form.reset();

    this.userStore.defaultDateParams(this.company.companyId);

    this.subscription = this.userStore.defaultDate$.subscribe((data) => {
      form.patchValue({
        from: data.start_compy_rep_date,
        to: data.end_date,
      });
    });
    // form.patchValue({
    //   from: filters.from,
    //   to: filters.to,
    // });
    // this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    // this.dateHttp.defaultDatesParams(this.companyId).subscribe(
    //   (data) => {
    //     form.patchValue({
    //       from: data[0].start_compy_rep_date,
    //       to: data[0].end_date,
    //     });
    //   },
    //   () => {
    //     this.toastService.error("Request Timed Out");
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  saveHandler(filters: CompanyListReportFilter): void {
    if (!filters.from || !filters.to) return;
    this.inFilterMode = false;

    if (!filters.statusId) {
      filters.statusId = "ALL";
    }
    if (!filters.typeId) {
      filters.typeId = "ALL";
    }

    filters.from = this.moment(filters.from).format("YYYY-MM-DD");
    filters.to = this.moment(filters.to).format("YYYY-MM-DD");
    this.report$ = this.reportDataAccessor.generateCompanyListReport(
      this.company.companyId,
      filters
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  excelFormat(data) {
    return data.map((val) => {
      return {
        "Company Name": val.companyName,
        "Company Type Name": val.companyTypeId,
        Status: val.statusName,
        "Created Date": val.createdDate,
        // "Manuf. Device Id": val.manufDeviceId,
        // "Device Name": val.deviceName,
        // "Asset Name": val.assetName,
        // "Device Categ. Name": val.deviceCategName,
        // "Location Name": val.locationName,
        // "City Name": val.cityName,
        // "State Name": val.stateName,
        // statusId: val.statusId,
      };
    });
  }
}
