import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from "rxjs/operators";
import { UserGroup } from "src/app/data-access/models/group.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { UserGroupDataAccessorService } from "src/app/data-access/user-group-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { AddUserGroupModalComponent } from "src/app/widgets/user-widgets/add-user-group-modal/add-user-group-modal.component";

@Component({
  selector: "app-corporate-user-groups",
  templateUrl: "./corporate-user-groups.component.html",
  styleUrls: ["./corporate-user-groups.component.scss"],
})
export class CorporateUserGroupsComponent implements OnInit, OnDestroy {
  searchField = new FormControl("");

  formColor: string;
  formBgColor: string;
  formFont: string;

  primaryColour: string;
  secondaryColour: string;

  groups$: Observable<UserGroup[]> = of([]);

  private unsubscriber = new Subject();
  permission$: Observable<CorporatePermissionCategory>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private modal: NgbModal,
    private readonly dataAccessor: UserGroupDataAccessorService,
    private sessionService: SessionStorageService,
    private companyInfoService: CompanyInfoService,
    private toastService: ToastrService
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {
    ChangeDetectionStrategy.Default;
    this.groups$ = this.dataAccessor.search(this.searchField.value);

    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim()),
        debounceTime(350),
        distinctUntilChanged()
      )
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((keywords) => {
        this.groups$ = this.dataAccessor.search(keywords);
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  addGroupHandler(): void {
    const modalRef = this.modal.open(AddUserGroupModalComponent);
    (modalRef.componentInstance as AddUserGroupModalComponent).redirect =
      () => {
        this.modal.dismissAll();
        this.dataAccessor.destroyAccessor();
      };
  }

  openDetails(entry: UserGroup): void {
    this.router.navigate([entry.roleId, "details"], { relativeTo: this.route });
  }
}
