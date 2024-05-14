import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CorporatePermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-corporate-utility',
  templateUrl: './corporate-utility.component.html',
  styleUrls: ['./corporate-utility.component.scss']
})
export class CorporateUtilityComponent implements OnInit {

  formBgColor: string;

  permission$: Observable<CorporatePermissionCategory>

  constructor(
    private sessionService: SessionStorageService,
    private readonly companyInfoService: CompanyInfoService,
  ) {
    this.permission$ = this.sessionService.readPermission()
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
   }

  ngOnInit(): void {
  }

}
