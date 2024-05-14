import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CorporatePermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-corporate-setup',
  templateUrl: './corporate-setup.component.html',
  styleUrls: ['./corporate-setup.component.scss']
})
export class CorporateSetupComponent implements OnInit {

  permission$: Observable<CorporatePermissionCategory>

  formColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    private sessionService: SessionStorageService,
    private companyInfoService: CompanyInfoService,

  ) { 
    this.permission$ = this.sessionService.readPermission()
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
  }

}
