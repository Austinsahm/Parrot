import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
} from "rxjs/operators";
import { CompanyDetailDataAccessService } from "src/app/data-access/company-detail-data-access.service";
import { CompanyUser } from "src/app/data-access/models/company.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { UserDataAccviceessorService } from "src/app/data-access/user-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { AddUserModalComponent } from "src/app/widgets/user-widgets/add-user-modal/add-user-modal.component";

@Component({
  selector: "app-partner-users",
  templateUrl: "./partner-users.component.html",
  styleUrls: ["./partner-users.component.scss"],
})
export class PartnerUsersComponent implements OnInit {
  searchField = new FormControl("");
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;


  users$: Observable<CompanyUser[]> = of([]);
  private _users: CompanyUser[] = [];
  subdomain: string;
  unsubscriber = new Subject();
  permission$: Observable<CorporatePermissionCategory>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly modal: NgbModal,
    private readonly companyInfoService: CompanyInfoService,
    private readonly dataAccessor: CompanyDetailDataAccessService,
    private readonly userAccessor: UserDataAccviceessorService,
    private sessionService: SessionStorageService
  ) {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.permission$ = this.sessionService.readPermission();

    this.users$ = this._search(this.searchField.value);

    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim()),
        debounceTime(350),
        distinctUntilChanged()
      )
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((keywords) => (this.users$ = this._search(keywords)));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  openDetails(user: CompanyUser): void {
    this.router.navigate([user.userId, "update", "company", user.companyId], {
      relativeTo: this.route,
    });
  }

  addUserHandler(): void {
    const modalRef = this.modal.open(AddUserModalComponent);
    (modalRef.componentInstance as AddUserModalComponent).company =
      this.companyInfoService.getCompanyInfo();
    (modalRef.componentInstance as AddUserModalComponent).redirect = () => {
      this.modal.dismissAll();
      this.userAccessor.destroyAccessor();
      this.dataAccessor.destroyAccessor();
      this.users$ = this._search(this.searchField.value);
      // this.router.navigate(['../'], { relativeTo: this.route });
    };
  }

  private _search(keyworkds?: string) {
    return this.dataAccessor
      .getAccessor(this.subdomain)
      .searchUsers(keyworkds)
      .pipe(tap((users) => (this._users = users)));
  }
}
