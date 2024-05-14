import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CorporateReportHttpService } from 'src/app/data-access/http/corporate-report-http.service';
import { Device, DeviceMessage } from 'src/app/data-access/models/device.model';
import { Domain } from 'src/app/data-access/models/domain.model';
import { CorporateDeviceListReportFilter } from 'src/app/data-access/models/report.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-billing-report',
  templateUrl: './billing-report.component.html',
  styleUrls: ['./billing-report.component.scss']
})
export class BillingReportComponent implements OnInit {

  report$: Observable<DeviceMessage[]> = of([]);
  inFilterMode = true;
  company: Domain;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private backendService: CorporateReportHttpService
  ) { 
    this.company = this.companyInfoService.getCompanyInfo();

  }

  ngOnInit(): void {
  }

  cancelHandler(): void { }

  saveHandler(filters: CorporateDeviceListReportFilter): void {
    this.inFilterMode = false;
    this.report$ = this.backendService.generateDeviceMessage(this.company.companyId, filters);
  }

}
