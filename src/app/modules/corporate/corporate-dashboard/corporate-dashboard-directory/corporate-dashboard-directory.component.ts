import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardHttpService } from 'src/app/data-access/http/dashboard-http.service';
import { DashboardDirectory } from 'src/app/data-access/models/dashboard.model';
import { CorporatePermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-corporate-dashboard-directory',
  templateUrl: './corporate-dashboard-directory.component.html',
  styleUrls: ['./corporate-dashboard-directory.component.scss']
})
export class CorporateDashboardDirectoryComponent implements OnInit {

  searchField = new FormControl('');
  dashboards$: Observable<DashboardDirectory[]> = of([]);
  companyId: string;
  formColor: string;
  formBgColor: string;
  formFont: string;
  // unsubscriber = new Subject();
  
  permission$: Observable<CorporatePermissionCategory>

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dashboardHttpService: DashboardHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef,
    private sessionService: SessionStorageService,
  ) { }

  ngOnInit(): void {

    this.permission$ = this.sessionService.readPermission()

    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.dashboards$ = this.dashboardHttpService.fetchDashboardList(this.companyId);

    // this.dashboards$ = this._search(this.searchField.value);

    // this.searchField.valueChanges.pipe(
    //   map((keywords: string) => keywords.trim()),
    //   debounceTime(350),
    //   distinctUntilChanged()
    // ).pipe(takeUntil(this.unsubscriber)).subscribe((keywords) => {
    //   this.devices$ = this._search(keywords);
    //   this.cd.detectChanges();
    // });
  }

  // private _search(keywords?: string): Observable<DashboardDirectory[]> {
  //   return this.deviceDataAccessor.getAccessor(
  //     this.companyInfoService.getCompanyInfo().companyId
  //   ).searchDirectory(keywords);
  // }

  openDetails(entry: DashboardDirectory): void {
    this.router.navigate(['../dashboard-update', entry.dashboardId], { relativeTo: this.route, state:{dashboard: entry} });
  }

  // goToCompanyInformation(company) {
  //   this.router.navigate([`../company-detail/${company.companyId}`], { relativeTo: this.route, state:{parentCompany: company.parentCompany} });
  // }

  goToAddDashboard(){
    this.router.navigate([`../dashboard-new`], { relativeTo: this.route });
  }

}
