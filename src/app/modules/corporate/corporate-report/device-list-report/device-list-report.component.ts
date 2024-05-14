import { Component, OnInit } from "@angular/core";
import { $ } from "protractor";
import { Observable, of } from "rxjs";
import { filter } from "rxjs/operators";
import { CorporateReportHttpService } from "src/app/data-access/http/corporate-report-http.service";
import { Device } from "src/app/data-access/models/device.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { CorporateDeviceListReportFilter } from "src/app/data-access/models/report.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { Router } from "@angular/router";
import { faToiletPaperSlash } from "@fortawesome/free-solid-svg-icons";
import * as _moment from "moment";

@Component({
  selector: "app-device-list-report",
  templateUrl: "./device-list-report.component.html",
  styleUrls: ["./device-list-report.component.scss"],
})
export class DeviceListReportComponent implements OnInit {
  report$: Observable<Device[]> = of([]);
  inFilterMode = true;
  company: Domain;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  moment = _moment;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private backendService: CorporateReportHttpService,
    private readonly router: Router
  ) {
    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {}

  cancelHandler(): void {
    this.reloadComponent();
  }

  saveHandler(filters: CorporateDeviceListReportFilter): void {
    if (!filters.from || !filters.to) return;
    this.inFilterMode = false;

    if (!filters.fromCategory) {
      filters.fromCategory = "AAAAAA";
    }
    if (!filters.toCategory) {
      filters.toCategory = "ZZZZZZ";
    }
    if (!filters.statusId) {
      filters.statusId = "ALL";
    }
    if (!filters.networkId) {
      filters.networkId = "ALL";
    }
    filters.from = this.moment(filters.from).format("YYYY-MM-DD");
    filters.to = this.moment(filters.to).format("YYYY-MM-DD");
    this.report$ = this.backendService.generateDeviceList(
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
    return data?.map((val) => {
      return {
        "Manuf. Device Id": val.manufDeviceId,
        "Device Name": val.deviceName,
        "Company Name": val.companyName,
        "Created Date": val.createdDate,
        Status: val.statusName,
        "Device Network": val.assetName,
        "Device Categ. Name": val.deviceCategName,
        Location: val.locationName,
        City: val.cityName,
        State: val.stateName,
        // statusId: val.statusId,
      };
    });
  }
}
