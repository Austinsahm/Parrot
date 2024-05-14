import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from "rxjs/operators";
import { CompanyDataAccessService } from "src/app/data-access/company-data-access.service";
import { Company } from "src/app/data-access/models/company.model";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { WhiteLabelDirectory } from "src/app/data-access/models/white-label.model";
import { CompanyStoreService } from "src/app/data-access/store/company-store.service";
import { WhiteLabelDataAccessService } from "src/app/data-access/white-label-data-access.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { PartnerCompanyParametersComponent } from "../../partner-security/partner-company-parameters/partner-company-parameters.component";

@Component({
  selector: "app-company-parameters-list",
  templateUrl: "./company-parameters-list.component.html",
  styleUrls: ["./company-parameters-list.component.scss"],
})
export class CompanyParametersListComponent implements OnInit, OnDestroy {
  formColor: string;
  formBgColor: string;
  formFont: string;


  searchField = new FormControl("");
  companies$: Observable<Company[]> = of([]);
  unsubscriber = new Subject();

  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private readonly dataAccessor: WhiteLabelDataAccessService,
    private readonly router: Router,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private sessionService: SessionStorageService,
    private readonly companyDataAccessor: CompanyDataAccessService,
    private readonly modal: NgbModal,
    private companyStore: CompanyStoreService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
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
    return this.dataAccessor.getAccessor(
      this.companyInfoService.getCompanyInfo().companyId
    ).directory.findBySubdomain(subdomain);
  }

  openDetails(company:Company): void {
    this.router.navigate(
      [`../company-parameters-details/${company.companyId}/company/${company.companyName.trim()}`],
      {
        relativeTo: this.route,
      }
    );
    // const modalRef = this.modal.open(PartnerCompanyParametersComponent, { size: 'lg' });
    // (modalRef.componentInstance as PartnerCompanyParametersComponent).company$ = this._find(company.subdomain)
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
