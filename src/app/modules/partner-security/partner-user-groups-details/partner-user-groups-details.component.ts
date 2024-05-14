import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, of, zip } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { UserGroupHttpService } from "src/app/data-access/http/user-group-http.service";
import {
  CompanyRole,
  CompanyUser,
} from "src/app/data-access/models/company.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { UserGroup } from "src/app/data-access/models/group.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { UserDataAccviceessorService } from "src/app/data-access/user-data-accessor.service";
import { UserGroupDataAccessorService } from "src/app/data-access/user-group-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { GroupUserModalComponent } from "src/app/widgets/user-widgets/group-user-modal/group-user-modal.component";
import { UserGroupFormComponent } from "src/app/widgets/user-widgets/user-group-form/user-group-form.component";

@Component({
  selector: "app-partner-user-groups-details",
  templateUrl: "./partner-user-groups-details.component.html",
  styleUrls: ["./partner-user-groups-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerUserGroupsDetailsComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  addUserRole: { userId: string }[] = [];
  delUserRole: { userId: string }[] = [];

  @ViewChild(UserGroupFormComponent) formElement: UserGroupFormComponent;

  source$: Observable<{ group: UserGroup; users: CompanyUser[] }>;
  private _source: { group: UserGroup; users: CompanyUser[] };
  edit = false;
  company: Domain;

  permission$: Observable<CorporatePermissionCategory>;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly dataAccessor: UserGroupDataAccessorService,
    private readonly userDataAccessor: UserDataAccviceessorService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly modal: NgbModal,
    private readonly route: ActivatedRoute,
    private reouter: Router,
    private userGroupHttpService: UserGroupHttpService,
    private toastService: ToastrService,
    private sessionService: SessionStorageService
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.source$ = this.route.paramMap.pipe(
      concatMap((params) =>
        this._resolve(params.get("group"), params.get("companyId"))
      ),
      tap((source) => (this._source = source))
    );
  }

  private _resolve(
    roleId: string,
    companyId: string
  ): Observable<{ group: UserGroup; users: CompanyUser[] }> {
    if (!roleId || !companyId) {
      return of({ group: null, users: [] });
    }

    // const roleId = role.split("-")[0];
    // const companyId = role.split("-")[1];

    return zip(
      this.dataAccessor.findById(roleId),
      this.userDataAccessor.getAccessor(companyId).fetchByGroup(roleId)
    ).pipe(map(([group, users]) => ({ group, users })));
  }

  addUserHandler(): void {
    const modalRef = this.modal.open(GroupUserModalComponent);
    (modalRef.componentInstance as GroupUserModalComponent).company =
      this.company;
    (modalRef.componentInstance as GroupUserModalComponent).group =
      this._source.group;
    (modalRef.componentInstance as GroupUserModalComponent).existingUserIds =
      this._source.users.map((u) => u.userId);

    modalRef.result.then(
      (members: CompanyUser[]) => {
        if (!members?.length) {
          return;
        }

        const source = Object.assign({}, this._source);
        source.users = [...members, ...source.users];

        this.addUserRole.push(
          ...members.map(({ userId }) => <{ userId: string }>{ userId })
        );
        this.source$ = of(source).pipe(tap((data) => (this._source = data)));

        this.cd.detectChanges();
      },
      () => {}
    );
  }

  saveHandler(): void {
    let userData: CompanyRole = {
      // ...this.formElement.form.value,
      companyId: this.formElement.form.value.company.companyId,
      roleDesc: this.formElement.form.value.roleDesc,
      roleName: this.formElement.form.value.roleName,
      statusId: this.formElement.form.value.statusId,
      roleId: this._source.group.roleId,
      addUserRole: this.addUserRole,
      delUserRole: this.delUserRole,
    };

    this.userGroupHttpService.updateRole(userData).subscribe(
      (res) => {
        if (res.status === StatusCode.SUCCESS) {
          this.toastService.success("Update Role successful", "Update Role");
          this.dataAccessor.destroyAccessor();
          this.reouter.navigate(["user-groups"], {
            relativeTo: this.route.parent,
          });
        } else {
          this.toastService.error("Error while creating", "");
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }

  userDeleteHandler(user: CompanyUser): void {
    const source = Object.assign({}, this._source);
    source.users = source.users.filter((u) => u.userId !== user.userId);
    let userIndex = this.addUserRole.findIndex((u) => u.userId === user.userId);

    if (userIndex === -1) {
      this.delUserRole.push({ userId: user.userId });
    } else {
      this.addUserRole.splice(userIndex, 1);
    }

    this.source$ = of(source).pipe(tap((data) => (this._source = data)));

    this.cd.detectChanges();
  }

  cancelHandler(): void {
    this.reouter.navigate(["user-groups"], { relativeTo: this.route.parent });
  }
}
