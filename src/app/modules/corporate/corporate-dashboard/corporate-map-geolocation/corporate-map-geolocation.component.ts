import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardHttpService } from 'src/app/data-access/http/dashboard-http.service';
import { DashboardDirectory } from 'src/app/data-access/models/dashboard.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-corporate-map-geolocation',
  templateUrl: './corporate-map-geolocation.component.html',
  styleUrls: ['./corporate-map-geolocation.component.scss']
})
export class CorporateMapGeolocationComponent implements OnInit {

  searchField = new FormControl('');
  geolocations$: Observable<DashboardDirectory[]> = of([]);
  companyId: string;
  formColor: string;
  formBgColor: string;
  formFont: string;
  // unsubscriber = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dashboardHttpService: DashboardHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.geolocations$ = this.dashboardHttpService.fetchGeolocationDirectory(this.companyId);

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
    this.router.navigate(['../map-geolocation-update', entry.dashboardId], { relativeTo: this.route });
  }
}