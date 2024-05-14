import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyTypeCode } from 'src/app/data-access/models/company.model';
import { Domain } from 'src/app/data-access/models/domain.model';
import { PartnerPermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  company: Domain;
  subdomain: string;
  formBgColor: string;
  formFont: string;

  get isPartner(): boolean {
    return !this.isCorporate
  }

  get isCorporate(): boolean {
    return [CompanyTypeCode.INDIVIDUAL, CompanyTypeCode.CORPORATE].includes(this.company?.companyType);
  }

  permission$: Observable<PartnerPermissionCategory>


  constructor(
    private readonly companyService: CompanyInfoService,
    private sessionService: SessionStorageService,
    private userInfoService: UserInfoService,
    protected readonly companyInfoService: CompanyInfoService,

  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.company = this.companyService.getCompanyInfo();
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
  }

  ngOnInit(): void { }

}
