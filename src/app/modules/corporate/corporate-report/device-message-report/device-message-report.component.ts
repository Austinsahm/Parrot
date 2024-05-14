import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { CorporateReportHttpService } from "src/app/data-access/http/corporate-report-http.service";
import { Device, DeviceMessage } from "src/app/data-access/models/device.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { CorporateDeviceListReportFilter } from "src/app/data-access/models/report.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { Router } from "@angular/router";
import * as _moment from "moment";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-device-message-report",
  templateUrl: "./device-message-report.component.html",
  styleUrls: ["./device-message-report.component.scss"],
})
export class DeviceMessageReportComponent implements OnInit {
  report$: Observable<DeviceMessage[]> = of([]);
  inFilterMode = true;
  company: Domain;
  formColor: string;
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
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
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
    filters.from = this.moment(filters.from).format("YYYY-MM-DD");
    filters.to = this.moment(filters.to).format("YYYY-MM-DD");
    this.report$ = this.backendService.generateDeviceMessage(
      this.company.companyId,
      filters
    );
  }
  // .pipe(tap((data) => console.log(data)));

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  excelFormat(data) {
    return data?.map((val) => {
      return {
        "Manuf. Device Id": val.deviceId,
        "Device Name": val.deviceName,
        "Company Name": val.companyName,
        // "Network": val.networkName,
        "Message Date": val.messageDate,
        Message: val.message,
        // "Asset Name": val.assetName,
        // "Created Date": val.createdDate,
        // statusId: val.statusId,
        // statusName: val.statusName,
        // "Device Categ. Name": val.deviceCategName,
        // "Location Name": val.locationName,
        // "City Name": val.cityName,
        // "State Name": val.stateName,
      };
    });
  }
}
