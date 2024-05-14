import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Domain } from "src/app/data-access/models/domain.model";
import {
  CompanyBillingReportEntry,
  CompanyBillingReportFilter,
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
  selector: "app-company-billing-report",
  templateUrl: "./company-billing-report.component.html",
  styleUrls: ["./company-billing-report.component.scss"],
})
export class CompanyBillingReportComponent implements OnInit, OnDestroy {
  company: Domain;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  moment = _moment;
  primaryColour: string;

  report$: Observable<CompanyBillingReportEntry[]>;
  inFilterMode = true;
  permission$: Observable<PartnerPermissionCategory>;

  subscription: Subscription;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportDataAccessor: ReportDataAccessorService,
    private sessionService: SessionStorageService,
    private dateHttp: DateHttpService,
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

  ngOnInit(): void {}

  cancelHandler(form: FormGroup, filters: CompanyBillingReportFilter): void {
    form.reset();

    this.userStore.defaultDateParams(this.company.companyId);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        form.patchValue({
          from: data.start_billing_rep_date,
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
    //       from: data[0].start_billing_rep_date,
    //       to: data[0].end_date,
    //     });
    //   },
    //   () => {
    //     this.toastService.error("Request Timed Out");
    //   }
    // );
  }

  saveHandler(filters: CompanyBillingReportFilter): void {
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

    this.report$ = this.reportDataAccessor.generateCompanyBillingReport(
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  excelFormat(data) {
    return data.map((val) => {
      return {
        "Company Name": val.companyName,
        "Manuf. Device Id": val.deviceId,
        "Device Name": val.deviceName,
        "Message Date": val.messageDate,
        "Message Count": val.messageCount,
        "Unit Price": val.messagePrice,
        "Total Cost": val.messageBill,
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
