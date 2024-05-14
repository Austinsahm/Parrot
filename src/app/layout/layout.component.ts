import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { CompanyInfoService } from '../services/company-info.service';
import { CompanyTypeCode } from '../data-access/models/company.model';
import { SessionStorageService } from '../services/session-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLoggedIn: boolean;

  get isCorporate(): boolean {
    return [CompanyTypeCode.INDIVIDUAL, CompanyTypeCode.CORPORATE].includes(
      this.companyInfoService.getCompanyInfo().companyType
    );
  }

  get isPartner(): boolean {
    return [CompanyTypeCode.PARTNER].includes(
      this.companyInfoService.getCompanyInfo().companyType
    );
  }

  get isBackOffice(): boolean {
    return !this.isPartner && !this.isCorporate;
  }

  companyInfo: any;

  loggedIn$: Observable<boolean>;

  constructor(
    private readonly session: SessionStorageService,
    private userInfoService: UserInfoService,
    private companyInfoService: CompanyInfoService,
    private renderer2: Renderer2
  ) {
    this.loggedIn$ = this.session.loggedIn$;

    this.isLoggedIn = true;

    this.companyInfo = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {
    this.renderer2.setStyle(document.body, 'background-color', '#' + (this.companyInfo.bodyColour || 'a7dce3'));

    this.userInfoService.$isLoggedIn.subscribe((logged) => {
      this.isLoggedIn = logged;
    });
  }

}
