import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Domain } from "src/app/data-access/models/domain.model";
import {
  DeviceListSummaryReportEntry,
  DeviceListSummaryReportFilter,
} from "src/app/data-access/models/report.model";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { ReportDataAccessorService } from "src/app/data-access/report-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { DateService } from "src/app/services/date.service";
import { Router } from "@angular/router";
import * as _moment from "moment";
import { FormGroup } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { ToastrService } from "ngx-toastr";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";

@Component({
  selector: "app-device-summary-report",
  templateUrl: "./device-summary-report.component.html",
  styleUrls: ["./device-summary-report.component.scss"],
})
export class DeviceSummaryReportComponent implements OnInit, OnDestroy {
  company: Domain;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  moment = _moment;
  primaryColour: string;

  report$: Observable<DeviceListSummaryReportEntry[]>;
  inFilterMode = true;
  permission$: Observable<PartnerPermissionCategory>;

  subscription: Subscription;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportDataAccessor: ReportDataAccessorService,
    private sessionService: SessionStorageService,
    private today: DateService,
    private readonly router: Router,
    private dateHttp: DateHttpService,
    private toastService: ToastrService,
    private userStore: UsersStoreService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {}

  cancelHandler(form: FormGroup, filters: DeviceListSummaryReportFilter): void {
    form.reset();

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        form.patchValue({
          from: data.start_device_rep_date,
          to: data.end_date,
        });
      },
      () => {}
    );
    // form.patchValue({
    //   from: filters.from,
    //   to: filters.to,
    // });
    // this.dateHttp.defaultDatesParams(this.company.companyId).subscribe(
    //   (data) => {
    //     form.patchValue({
    //       from: data[0].start_device_rep_date,
    //       to: data[0].end_date,
    //     });
    //   },
    //   () => this.toastService.error("Request Timed Out")
    // );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  saveHandler(filters: DeviceListSummaryReportFilter): void {
    if (!filters.from || !filters.to) return;
    this.inFilterMode = false;

    if (!filters.fromCompany) {
      filters.fromCompany = "AAAAAA";
    }
    if (!filters.toCompany) {
      filters.toCompany = "ZZZZZZ";
    }
    if (!filters.statusId) {
      filters.statusId = "ALL";
    }
    filters.from = this.moment(filters.from).format("YYYY-MM-DD");

    filters.to = this.moment(filters.to).format("YYYY-MM-DD");

    this.report$ = this.reportDataAccessor.generateDeviceSummaryReport(
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
        "Device Categ. Name": val.deviceCategName,
        Location: val.locationName,
        City: val.cityName,
        State: val.stateName,
        "Device Count": val.deviceCount,
        // "Device Name": val.deviceName,
        // "Manuf. Device Id": val.manufDeviceId,
        // "Asset Name": val.assetName,
        // "Created Date": val.createdDate,
        // statusId: val.statusId,
        // "Status": val.statusName,
      };
    });
  }
}
