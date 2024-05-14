import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Domain } from "src/app/data-access/models/domain.model";
import {
  CompanySummaryReportEntry,
  CompanySummaryReportFilter,
} from "src/app/data-access/models/report.model";
import { ReportDataAccessorService } from "src/app/data-access/report-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { DateService } from "src/app/services/date.service";
import { Router } from "@angular/router";
import * as _moment from "moment";
import { FormGroup } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { ToastrService } from "ngx-toastr";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";

@Component({
  selector: "app-company-summary-report",
  templateUrl: "./company-summary-report.component.html",
  styleUrls: ["./company-summary-report.component.scss"],
})
export class CompanySummaryReportComponent implements OnInit, OnDestroy {
  company: Domain;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  moment = _moment;
  primaryColour: string;

  report$: Observable<CompanySummaryReportEntry[]>;
  inFilterMode = true;
  subscription: Subscription;
  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportDataAccessor: ReportDataAccessorService,
    private today: DateService,
    private readonly router: Router,
    private dateHttp: DateHttpService,
    private toastService: ToastrService,
    private userStore: UsersStoreService
  ) {
    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {}

  cancelHandler(form: FormGroup, filters: CompanySummaryReportFilter): void {
    form.reset();

    this.userStore.defaultDateParams(this.company.companyId);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        form.patchValue({
          from: data.start_compy_rep_date,
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

  saveHandler(filters: CompanySummaryReportFilter): void {
    if (!filters.from || !filters.to) return;
    this.inFilterMode = false;

    if (!filters.typeId) {
      filters.typeId = "ALL";
    }
    if (!filters.statusId) {
      filters.statusId = "ALL";
    }
    filters.from = this.moment(filters.from).format("YYYY-MM-DD");
    filters.to = this.moment(filters.to).format("YYYY-MM-DD");

    console.log(filters);
    this.report$ = this.reportDataAccessor.generateCompanySummaryReport(
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
        "Company Type Name": val.companyTypeName,
        "Company Count": val.companyCount,
        // "Manuf. Device Id": val.manufDeviceId,
        // "Device Name": val.deviceName,
        // "Asset Name": val.assetName,
        // "Created Date": val.createdDate,
        // "Device Categ. Name": val.deviceCategName,
        // "Location Name": val.locationName,
        // "City Name": val.cityName,
        // "State Name": val.stateName,
        // statusId: val.statusId,
        // statusName: val.statusName,
      };
    });
  }
}
