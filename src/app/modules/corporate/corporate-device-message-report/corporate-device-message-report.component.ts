import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/data-access/models/domain.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-corporate-device-message-report',
  templateUrl: './corporate-device-message-report.component.html',
  styleUrls: ['./corporate-device-message-report.component.scss']
})
export class CorporateDeviceMessageReportComponent implements OnInit {

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
