import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/data-access/models/domain.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-corporate-device-summary-report',
  templateUrl: './corporate-device-summary-report.component.html',
  styleUrls: ['./corporate-device-summary-report.component.scss']
})
export class CorporateDeviceSummaryReportComponent implements OnInit {

  company: Domain;

  constructor(
    private readonly companyInfoService: CompanyInfoService
  ) {
    this.company = this.companyInfoService.getCompanyInfo();
   }

  ngOnInit(): void {
  }

  cancelHandler(): void {}

  saveHandler(data: any): void {
    console.log(data);
  }

}
