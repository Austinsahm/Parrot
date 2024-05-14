import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DateHttpService } from 'src/app/data-access/http/date-http.service';
import { CompanyTypeCode } from 'src/app/data-access/models/company.model';
import { Domain } from 'src/app/data-access/models/domain.model';
import { DeviceMessageReportEntry, DeviceMessageReportFilter } from 'src/app/data-access/models/report.model';
import { PartnerPermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { ReportDataAccessorService } from 'src/app/data-access/report-data-accessor.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-device-messge-report',
  templateUrl: './device-messge-report.component.html',
  styleUrls: ['./device-messge-report.component.scss']
})
export class DeviceMessgeReportComponent implements OnInit {

  company: Domain;

  report$: Observable<DeviceMessageReportEntry[]>;
  inFilterMode = true;

  get isPartner(): boolean {
    return [CompanyTypeCode.PARTNER].includes(this.company?.companyType);
  }

  get isCorporate(): boolean {
    return [CompanyTypeCode.CORPORATE, CompanyTypeCode.INDIVIDUAL].includes(this.company?.companyType);
  }
  permission$: Observable<PartnerPermissionCategory>

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportDataAccessor: ReportDataAccessorService,
    private sessionService: SessionStorageService,
    private dateService: DateHttpService,
  ) {
    this.permission$ = this.sessionService.partnerReadPermission()

    this.company = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {

  }

  cancelHandler(): void { }

  saveHandler(filters: DeviceMessageReportFilter): void {
    this.inFilterMode = false;
    this.report$ = this.isCorporate ?
      this.reportDataAccessor.generateCoporateDeviceMessageReport(this.company.companyId, filters) :
      this.reportDataAccessor.generateDeviceMessageReport(this.company.companyId, filters);
  }
}

