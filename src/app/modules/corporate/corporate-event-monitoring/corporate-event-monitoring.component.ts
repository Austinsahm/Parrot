import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-corporate-event-monitoring',
  templateUrl: './corporate-event-monitoring.component.html',
  styleUrls: ['./corporate-event-monitoring.component.scss']
})
export class CorporateEventMonitoringComponent implements OnInit {

  formColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    private companyInfoService: CompanyInfoService,
  ) {

    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
   }

  ngOnInit(): void {
  }

}
