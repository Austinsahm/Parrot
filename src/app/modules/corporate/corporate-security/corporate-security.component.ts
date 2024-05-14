import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CorporatePermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { UserRoleCode } from 'src/app/services/user.service';

@Component({
  selector: 'app-corporate-security',
  templateUrl: './corporate-security.component.html',
  styleUrls: ['./corporate-security.component.scss']
})
export class CorporateSecurityComponent implements OnInit {

  get isAdmin(): boolean {
    return this.userInfoService.getUserInfo()?.roleId === UserRoleCode.ADMINISTRATOR;
  }
    permission$: Observable<CorporatePermissionCategory>
    formColor: string;
    formBgColor: string;
    formFont: string;


  constructor(
    private readonly userInfoService: UserInfoService,
    private sessionService: SessionStorageService,
    private companyInfoService: CompanyInfoService,
  ) { }

  ngOnInit(): void {
    this.permission$ = this.sessionService.readPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

}
