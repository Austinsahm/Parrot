import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyHttpService } from 'src/app/data-access/http/company-http.service';
import { UserStatDetail } from 'src/app/data-access/models/company.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-corporate-user-landing',
  templateUrl: './corporate-user-landing.component.html',
  styleUrls: ['./corporate-user-landing.component.scss']
})
export class CorporateUserLandingComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;

  companyId: string;
  userTypes$: Observable<UserStatDetail[]>;
  userStatus$: Observable<UserStatDetail[]>;

  constructor(
    private companyHttpService: CompanyHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService
  ) { 
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    
    this.companyId = this.userInfoService.getUserInfo().userCompanyId;

    this.userTypes$ = this.companyHttpService.fetchUserStatTypeDetail(this.companyId);

    this.userStatus$ = this.companyHttpService.fetchUserStatStatusDetail(this.companyId);

  }

}
