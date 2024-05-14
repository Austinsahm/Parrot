import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PartnerSecurityRoutingModule } from "./partner-security-routing.module";
import { PartnerSecurityComponent } from "./partner-security/partner-security.component";
import { PartnerChangePasswordComponent } from "./partner-change-password/partner-change-password.component";
import { CommonWidgetsModule } from "src/app/widgets/common-widgets/common-widgets.module";
import { PartnerUserDeviceAccessComponent } from "./partner-user-device-access/partner-user-device-access.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonCompanyAssetModule } from "src/app/widgets/common-company-asset/common-company-asset.module";
import { DashboardWidgetsModule } from "src/app/widgets/dashboard-widgets/dashboard-widgets.module";
import { UserWidgetsModule } from "src/app/widgets/user-widgets/user-widgets.module";
import { PartnerUsersComponent } from "./partner-users/partner-users.component";
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { PartnerUserGroupsComponent } from "./partner-user-groups/partner-user-groups.component";
import { PartnerRoleAuthorizationComponent } from "./partner-role-authorization/partner-role-authorization.component";
import { CompanyWidgetsModule } from "src/app/widgets/company-widgets/company-widgets.module";
import { PartnerUserGroupsDetailsComponent } from "./partner-user-groups-details/partner-user-groups-details.component";
import { PartnerUserUpdateComponent } from "./partner-user-update/partner-user-update.component";
import { PartnerUserDetailFormComponent } from "./partner-user-detail-form/partner-user-detail-form.component";
import { PartnerUserDetailViewComponent } from "./partner-user-detail-view/partner-user-detail-view.component";
import { PartnerCompanyParametersComponent } from "./partner-company-parameters/partner-company-parameters.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    PartnerSecurityComponent,
    PartnerChangePasswordComponent,
    PartnerUserDeviceAccessComponent,
    PartnerUsersComponent,
    PartnerUserGroupsComponent,
    PartnerRoleAuthorizationComponent,
    PartnerUserGroupsDetailsComponent,
    PartnerUserUpdateComponent,
    PartnerUserDetailFormComponent,
    PartnerUserDetailViewComponent,
    PartnerCompanyParametersComponent,
  ],
  imports: [
    CommonModule,
    CommonWidgetsModule,
    PartnerSecurityRoutingModule,
    DragDropModule,
    CommonCompanyAssetModule,
    DashboardWidgetsModule,
    UserWidgetsModule,
    NgbModule,
    NgbTooltipModule,
    CompanyWidgetsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class PartnerSecurityModule {}
