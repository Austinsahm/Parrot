import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserTypeFieldComponent } from "./user-type-field/user-type-field.component";
import { UserRoleFieldComponent } from "./user-role-field/user-role-field.component";
import { CommonWidgetsModule } from "../common-widgets/common-widgets.module";
import { DataAccessModule } from "src/app/data-access/data-access.module";
import { AddUserModalComponent } from "./add-user-modal/add-user-modal.component";
import { CommonCompanyAssetModule } from "../common-company-asset/common-company-asset.module";
import { UserGroupFormComponent } from "./user-group-form/user-group-form.component";
import { AddUserGroupModalComponent } from "./add-user-group-modal/add-user-group-modal.component";
import { GroupUserModalComponent } from "./group-user-modal/group-user-modal.component";
import { UserFieldComponent } from "./user-field/user-field.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    UserTypeFieldComponent,
    UserRoleFieldComponent,
    AddUserModalComponent,
    UserGroupFormComponent,
    AddUserGroupModalComponent,
    GroupUserModalComponent,
    UserFieldComponent,
  ],
  imports: [
    CommonModule,
    CommonWidgetsModule,
    DataAccessModule,
    CommonCompanyAssetModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    UserTypeFieldComponent,
    UserRoleFieldComponent,
    AddUserModalComponent,
    UserGroupFormComponent,
    UserFieldComponent,
  ],
})
export class UserWidgetsModule {}
