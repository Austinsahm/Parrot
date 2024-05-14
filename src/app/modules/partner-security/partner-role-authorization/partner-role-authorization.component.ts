import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { RoleAuthorizationHttpService } from "src/app/data-access/http/role-authorization-http.service";
import { StatusCode } from "src/app/data-access/models/http.model";
import {
  CorporatePermissionCategory,
  Menu,
  Portal,
  RoleAuthorizationUpdate,
} from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-partner-role-authorization",
  templateUrl: "./partner-role-authorization.component.html",
  styleUrls: ["./partner-role-authorization.component.scss"],
})
export class PartnerRoleAuthorizationComponent implements OnInit {
  deviceForm: FormGroup;
  companyId: string;
  userId: string;
  subdomain: string;
  companyName: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  roleMenus: Menu[] = [];

  permission$: Observable<CorporatePermissionCategory>;

  roleAuthData: RoleAuthorizationUpdate;

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private roleAuthorizationService: RoleAuthorizationHttpService,
    private sessionService: SessionStorageService,
    private toastService: ToastrService
  ) {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.permission$ = this.sessionService.readPermission();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

    this.deviceForm = this.formBuilder.group({
      companyId: [this.subdomain, [Validators.required]],
      roleId: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.companyName = this.companyInfoService.getCompanyInfo().companyName;

    this.userId = this.userInfoService.getUserInfo().userId;

    this.deviceForm.get("roleId").valueChanges.subscribe(
      (value) => {
        if (!value) return;

        this.roleAuthorizationService.fetchSpecificRole(value).subscribe(
          (response) => {
            let menus = response.filter(
              (each) => each.portal === Portal.Corporate
            );

            let filteredMenu = menus.reduce((acc, role) => {
              if (!acc[role.categName]) acc[role.categName] = [];

              acc[role.categName].push(role);

              return acc;
            }, {});

            let menuLists: Menu[] = [
              ...Object.keys(filteredMenu).map((each) => ({
                title: each,
                data: filteredMenu[each],
              })),
            ];

            this.roleMenus = menuLists;

            this.updateData();
          },
          () => this.toastService.error("Request Timed Out")
        );
      },
      () => {}
    );
  }

  updateData(): void {
    let data: RoleAuthorizationUpdate = {
      roleId: this.deviceForm.get("roleId").value,
      access: this.roleMenus.map((each) => {
        return {
          menuCategId: each.data[0].menuCategId,
          menus: [
            ...each.data.map((data) => ({
              menuId: data.menuId,
              authorizationId: data.authorizationId,
              actions: {
                menuAccess: data.menuAccess,
                creater: data.creater,
                updater: data.updater,
                reader: data.reader,
                deleter: data.deleter,
              },
            })),
          ],
        };
      }),
    };

    this.roleAuthData = data;
  }

  updateRoleAuthData(
    menuCategIndex: number,
    menuIndex: number,
    e: any,
    key: string
  ) {
    let value = e.target.checked ? "1" : "0";

    let selectedMenuCateg = this.roleAuthData.access[menuCategIndex];

    let selectedMenu = selectedMenuCateg.menus[menuIndex];

    let actions = selectedMenu.actions;

    actions[key] = value;

    selectedMenuCateg.menus.splice(menuIndex, 1, {
      ...selectedMenu,
      actions: { ...actions },
    });

    this.roleAuthData.access.splice(menuCategIndex, 1, selectedMenuCateg);
  }

  onMenuAccessChange(e: any, menuCategIndex: number, menuIndex: number) {
    this.updateRoleAuthData(menuCategIndex, menuIndex, e, "menuAccess");
  }

  onCreaterChange(e: any, menuCategIndex: number, menuIndex: number) {
    this.updateRoleAuthData(menuCategIndex, menuIndex, e, "creater");
  }

  onUpdaterChange(e: any, menuCategIndex: number, menuIndex: number) {
    this.updateRoleAuthData(menuCategIndex, menuIndex, e, "updater");
  }

  onReaderChange(e: any, menuCategIndex: number, menuIndex: number) {
    this.updateRoleAuthData(menuCategIndex, menuIndex, e, "reader");
  }

  onDeleterChange(e: any, menuCategIndex: number, menuIndex: number) {
    this.updateRoleAuthData(menuCategIndex, menuIndex, e, "deleter");
  }

  updateMenuAccess() {
    this.roleAuthorizationService
      .updateSpecificRole(this.roleAuthData)
      .subscribe(
        (res) => {
          if (res.status === StatusCode.SUCCESS) {
            this.toastService.success(
              "Update Role Successful",
              "Role Authorization"
            );
            // this.router.navigate(['../users'], { relativeTo: this.route });
          } else {
            this.toastService.error("Error while updating", "");
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

  changeCompany(event) {
    this.deviceForm.patchValue({ companyId: event.value });
    this.deviceForm.get("roleId").reset();
    this.roleMenus = [];
  }
}
