import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { WhiteLabelDirectory } from 'src/app/data-access/models/white-label.model';
import { WhiteLabelDataAccessService } from 'src/app/data-access/white-label-data-access.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { WhiteLabelDetailsModalComponent } from '../white-label-details-modal/white-label-details-modal.component';

@Component({
  selector: 'app-white-label-list',
  templateUrl: './white-label-list.component.html',
  styleUrls: ['./white-label-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhiteLabelListComponent implements OnInit, OnDestroy {
  formColor: string;
  formBgColor: string;
  formFont: string;


  searchField = new FormControl('');
  companies$: Observable<WhiteLabelDirectory[]> = of([]);
  unsubscriber = new Subject();

  constructor(
    private readonly dataAccessor: WhiteLabelDataAccessService,
    private readonly modal: NgbModal,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
   }

  ngOnInit(): void {
    this.companies$ = this._search(this.searchField.value);

    this.searchField.valueChanges.pipe(
      map((keywords: string) => keywords.trim()),
      debounceTime(350),
      distinctUntilChanged()
    ).pipe(takeUntil(this.unsubscriber)).subscribe((keywords) => {
      this.companies$ = this._search(keywords);
      this.cd.detectChanges();
    });
  }

  private _search(keywords?: string): Observable<WhiteLabelDirectory[]> {
    return this.dataAccessor.getAccessor(
      this.companyInfoService.getCompanyInfo().companyId
    ).directory.search(keywords);
  }

  private _find(subdomain: string) {
    return this.dataAccessor.getAccessor(
      this.companyInfoService.getCompanyInfo().companyId
    ).directory.findBySubdomain(subdomain);
  }

  openDetails(entry: WhiteLabelDirectory): void {
    const modalRef = this.modal.open(WhiteLabelDetailsModalComponent, { size: 'lg' });
    (modalRef.componentInstance as WhiteLabelDetailsModalComponent).company$ = this._find(entry.subdomain)
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
