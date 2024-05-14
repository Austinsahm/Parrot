import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
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
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyStoreService } from "src/app/data-access/store/company-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-company-list-table-format",
  templateUrl: "./company-list-table-format.component.html",
  styleUrls: ["./company-list-table-format.component.scss"],
})
export class CompanyListTableFormatComponent implements OnInit, OnDestroy {
  formColor: string;
  formBgColor: string;
  formFont: string;
  companyId: string;
  primaryColour: string;

  @Output() addCompany = new EventEmitter();
  @Output() detailCompany = new EventEmitter();

  @ViewChild(DatatableComponent) companyListTable: DatatableComponent;

  searchField = new FormControl("");
  private unsubscriber = new Subject();
  companies$: Observable<Company[]>;

  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly companyDataAccessor: CompanyDataAccessService,
    private sessionService: SessionStorageService,
    private readonly cd: ChangeDetectorRef,
    private companyStore: CompanyStoreService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
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

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  /**
   * Performs a search for companies whose names match given keywords
   * @param keywords
   */
  search(keywords?: string): void {
    // this.companies$ = this.companyDataAccessor
    //   .getAccessor(this.companyId)
    //   .search(keywords);

    if (!keywords) {
      this.companyStore.companyList(this.companyId)

      this.companies$ = this.companyStore.companies$
    }else{
      this.companies$ = this.companyStore.searchCompany(keywords)
    }

    // this.cd.detectChanges();
  }

  goToCompanyInformation(company) {
    this.detailCompany.emit(company);
  }

  goToAddCompany() {
    this.addCompany.emit();
  }
}
