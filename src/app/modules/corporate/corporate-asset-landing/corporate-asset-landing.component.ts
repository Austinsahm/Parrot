import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyHttpService } from 'src/app/data-access/http/company-http.service';
import { StatDetail } from 'src/app/data-access/models/company.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-corporate-asset-landing',
  templateUrl: './corporate-asset-landing.component.html',
  styleUrls: ['./corporate-asset-landing.component.scss']
})
export class CorporateAssetLandingComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;

  companyId: string;
  asset$: Observable<StatDetail[]>;

  constructor(
    private companyHttpService: CompanyHttpService,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    protected readonly companyInfoService: CompanyInfoService,
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
   }

  ngOnInit(): void {
    
    this.companyId = this.userInfoService.getUserInfo().userCompanyId;

    this.asset$ = this.companyHttpService.fetchAssetStatDetail(this.companyId);

  }

}
