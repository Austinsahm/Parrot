import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from "rxjs/operators";
import { CompanyDataAccessService } from "src/app/data-access/company-data-access.service";
import { Company } from "src/app/data-access/models/company.model";
import { CompanyStoreService } from "src/app/data-access/store/company-store.service";
import { WhiteLabelDataAccessService } from "src/app/data-access/white-label-data-access.service";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-billing-list",
  templateUrl: "./billing-list.component.html",
  styleUrls: ["./billing-list.component.scss"],
})
export class BillingListComponent implements OnInit {
  formBgColor: string;
  formFontColor: string;
  formFont: string;

  searchField = new FormControl("");
  companies$: Observable<Company[]> = of([]);
  unsubscriber = new Subject();

  constructor(
    private readonly dataAccessor: WhiteLabelDataAccessService,
    private readonly router: Router,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly companyDataAccessor: CompanyDataAccessService,
    private companyStore: CompanyStoreService
  ) {
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscriber)
      )
      .subscribe((keywords) => {
        this.search(keywords);
      });

    this.search(this.searchField.value);
    this.cd.detectChanges();
  }

  /**
   * Performs a search for companies whose names match given keywords
   * @param keywords
   */
  search(keywords?: string): void {
    // this.companies$ = this.companyDataAccessor
    //   .getAccessor(this.companyInfoService.getCompanyInfo().companyId)
    //   .search(keywords);

    if (!keywords) {
      this.companyStore.companyList(
        this.companyInfoService.getCompanyInfo().companyId
      );

      this.companies$ = this.companyStore.companies$;
    } else {
      this.companies$ = this.companyStore.searchCompany(keywords);
    }

    // this.cd.detectChanges();
  }

  private _find(subdomain: string) {
    return this.dataAccessor
      .getAccessor(this.companyInfoService.getCompanyInfo().companyId)
      .directory.findBySubdomain(subdomain);
  }

  openDetails(company: Company): void {
    this.router.navigate(
      [
        `../client-bill/${
          company.companyId
        }/company/${company.companyName.trim()}`,
      ],
      {
        relativeTo: this.route,
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
