import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/data-access/models/domain.model';
import { CompanyTypeCode } from 'src/app/data-access/models/company.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { CorporatePermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  company: Domain;
  formFontColor: string;
  formBgColor: string;
  formFont: string;

  get isPartner(): boolean {
    return !this.isCorporate
  }

  get isCorporate(): boolean {
    return [CompanyTypeCode.INDIVIDUAL, CompanyTypeCode.CORPORATE].includes(this.company?.companyType);
  }

  permission$: Observable<CorporatePermissionCategory>


constructor(
  private readonly companyService: CompanyInfoService,
    private sessionService: SessionStorageService,
  ) {
    this.permission$ = this.sessionService.readPermission()

    this.company = this.companyService.getCompanyInfo();
    this.formFontColor = this.companyService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyService.getCompanyInfo().formColor;
    this.formFont = this.companyService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
  }

}
