import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorporateReportHttpService } from 'src/app/data-access/http/corporate-report-http.service';
import { Device, DeviceMessage } from 'src/app/data-access/models/device.model';
import { Domain } from 'src/app/data-access/models/domain.model';
import { CorporateDeviceListReportFilter } from 'src/app/data-access/models/report.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import * as _moment from 'moment';


@Component({
  selector: 'app-device-message-summary-report',
  templateUrl: './device-message-summary-report.component.html',
  styleUrls: ['./device-message-summary-report.component.scss']
})
export class DeviceMessageSummaryReportComponent implements OnInit {

   report$: Observable<DeviceMessage[]> = of([]);
  inFilterMode = true;
  company: Domain;
  moment = _moment;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private backendService: CorporateReportHttpService,
  ) { 
    this.company = this.companyInfoService.getCompanyInfo();

  }

  ngOnInit(): void {
  }

  cancelHandler(): void { }

  saveHandler(filters: CorporateDeviceListReportFilter): void {
    this.inFilterMode = false;
    if (!(filters.fromCategory)){
      filters.fromCategory = 'AAAAAA';
    }
    if (!(filters.toCategory)){
      filters.toCategory = 'ZZZZZZ';
    }
    if (!(filters.statusId)){
      filters.statusId = 'ALL';
    }
    filters.from = this.moment(filters.from).format(
      "YYYY-MM-DD")
    filters.to = this.moment(filters.to).format(
      "YYYY-MM-DD")
    // this.report$ = this.backendService.generateDeviceMessage(this.company.companyId, filters);
  }
}
