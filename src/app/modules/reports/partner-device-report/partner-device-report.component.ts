import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as _moment from "moment";
import { Observable, of } from "rxjs";
import { Domain } from "src/app/data-access/models/domain.model";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-partner-device-report",
  templateUrl: "./partner-device-report.component.html",
  styleUrls: ["./partner-device-report.component.scss"],
})
export class PartnerDeviceReportComponent implements OnInit {
  report$: Observable<any> = of([]);
  permission$: Observable<PartnerPermissionCategory>;
  inFilterMode = true;
  company: Domain;
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;
  moment = _moment;
  formData;
  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly router: Router,
    private sessionService: SessionStorageService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.company = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {}

  cancelHandler() {}

  saveHandler(form) {
    this.formData=form
    this.inFilterMode = false;
  }

  excelFormat(payload) {}

  getFormData() {
    return this.formData;
  }
}
