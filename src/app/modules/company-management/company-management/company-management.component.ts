import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerPermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;

  permission$: Observable<PartnerPermissionCategory>

  constructor(
    private sessionService: SessionStorageService,
    protected readonly companyInfoService: CompanyInfoService,

  ) { 
    this.permission$ = this.sessionService.partnerReadPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

  }

  ngOnInit(): void {
  }

}
