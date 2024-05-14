import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  takeUntil,
} from "rxjs/operators";
import { CompanyDataAccessService } from "src/app/data-access/company-data-access.service";
import { Company } from "src/app/data-access/models/company.model";
import { CompanyStoreService } from "src/app/data-access/store/company-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-summary-list",
  templateUrl: "./summary-list.component.html",
  styleUrls: ["./summary-list.component.scss"],
})
export class SummaryListComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;

  @ViewChild(DatatableComponent) companyListTable: DatatableComponent;

  searchField = new FormControl("");
  private unsubscriber = new Subject();
  companies$: Observable<Company[]>;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly companyInfoService: CompanyInfoService,
    private readonly companyDataAccessor: CompanyDataAccessService,
    private companyStore: CompanyStoreService
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
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
    // this.companies$ = this.companyDataAccessor.getAccessor(
    // this.companyInfoService.getCompanyInfo().companyId
    // ).search(keywords);

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

  goToSummaryInformation(company) {
    this.router.navigate([`../summary-detail/${company.companyId}`], {
      relativeTo: this.route,
      state: { parentCompany: company.parentCompany },
    });
  }
}
