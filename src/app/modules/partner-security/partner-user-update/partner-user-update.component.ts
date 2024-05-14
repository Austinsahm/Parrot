import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of, zip } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { CompanyDetailDataAccessService } from "src/app/data-access/company-detail-data-access.service";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import { CompanyUser } from "src/app/data-access/models/company.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { UserGroup } from "src/app/data-access/models/group.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { UserDataAccviceessorService } from "src/app/data-access/user-data-accessor.service";
import { UserGroupDataAccessorService } from "src/app/data-access/user-group-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-partner-user-update",
  templateUrl: "./partner-user-update.component.html",
  styleUrls: ["./partner-user-update.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerUserUpdateComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  source$: Observable<{ user: CompanyUser; groups: UserGroup[] }>;
  private _source: { user: CompanyUser; groups: UserGroup[] };
  company: Domain;
  edit = false;
  roleId: string;
  permission$: Observable<CorporatePermissionCategory>;

  constructor(
    private readonly router: Router,
    private readonly dataAccessor: CompanyDetailDataAccessService,
    private readonly groupDataAccessor: UserGroupDataAccessorService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly route: ActivatedRoute,
    private userHttpService: UserHttpService,
    private toastService: ToastrService,
    private userDataAccessor: UserDataAccviceessorService,
    private sessionService: SessionStorageService,
    private userInfoService: UserInfoService
  ) {
    this.company = this.companyInfoService.getCompanyInfo();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.permission$ = this.sessionService.readPermission();

    this.source$ = this.route.paramMap.pipe(
      concatMap((params) => {
        return this._resolve(params.get("user"), params.get("companyId"));
        // return this._resolve(params.get("user"), this.company.companyId);
      })
    );
  }

  private _resolve(
    userId: string,
    companyId: string
  ): Observable<{ user: CompanyUser; groups: UserGroup[] }> {
    return zip(
      this.dataAccessor.getAccessor(companyId).findUserById(userId),
      this.groupDataAccessor.fetchForUser(companyId, userId)
    ).pipe(
      map(([user, groups]) => ({ user, groups })),
      tap((source) => {
        this._source = source;
        this.roleId = source.groups[0].roleId;
      })
    );
  }

  groupsChangedHandler(groups: UserGroup[]): void {    
    const source = Object.assign({}, this._source);
    source.groups = groups;
    this.source$ = of(source).pipe(tap((s) => (this._source = s)));
    this.roleId = groups[0]?.roleId;
  }

  cancelHandler(): void {
    if (this.edit) this.edit = !this.edit;
    else this.router.navigate(["users"], { relativeTo: this.route.parent });
  }

  saveHandler(item: CompanyUser): void {
    let userData: CompanyUser = item;
    userData.userId = this._source.user.userId;
    userData.roleId = this.roleId;

    this.userHttpService.updateUser(userData).subscribe(
      (res) => {
        if (res.status === StatusCode.SUCCESS) {
          if (userData.userId === this.userInfoService.getUserInfo().userId) {
            const updateUserInfo = { ...this.userInfoService.getUserInfo() };
            updateUserInfo.firstName = userData.firstName;
            updateUserInfo.lastName = userData.lastName;
            updateUserInfo.emailAddress = userData.emailAddress;
            updateUserInfo.pryPhoneNo = userData.pryPhoneNo;
            updateUserInfo.userTypeId = userData.userTypeName;
            updateUserInfo.locationId=userData.locationId
            this.sessionService.setUser(updateUserInfo).subscribe();
          }
          this.userDataAccessor.destroyAccessor();
          this.toastService.success("Updated User successful", "Update User");
          // window.location.reload();
          this.router.navigate(["users"], { relativeTo: this.route.parent });
        } else {
          this.toastService.error("Error while creating", "");
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error(
            "You can't make the request, You are offline",
            ""
          );
        else this.toastService.error("Unknown errors", "");
      }
    );
  }
}
