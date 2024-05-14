import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerChangePasswordComponent } from './partner-change-password/partner-change-password.component';
import { PartnerRoleAuthorizationComponent } from './partner-role-authorization/partner-role-authorization.component';
import { PartnerSecurityComponent } from './partner-security/partner-security.component';
import { PartnerUserDeviceAccessComponent } from './partner-user-device-access/partner-user-device-access.component';
import { PartnerUserGroupsDetailsComponent } from './partner-user-groups-details/partner-user-groups-details.component';
import { PartnerUserGroupsComponent } from './partner-user-groups/partner-user-groups.component';
import { PartnerUserUpdateComponent } from './partner-user-update/partner-user-update.component';
import { PartnerUsersComponent } from './partner-users/partner-users.component';


const routes: Routes = [
  {
    path: '',
    component: PartnerSecurityComponent,
    children: [
      { path: '', redirectTo: 'change-password', pathMatch: 'full' },
      {
        path: 'change-password',
        component: PartnerChangePasswordComponent
      },
      {
        path: 'user-device-access',
        component: PartnerUserDeviceAccessComponent
      },
      {
        path: 'users',
        component: PartnerUsersComponent
      },
      {
        path: 'users/:user/update/company/:companyId',
        component: PartnerUserUpdateComponent
      },
      {
        path: 'user-groups',
        component: PartnerUserGroupsComponent
      },
      {
        path: 'user-groups/:group/details/:companyId',
        component: PartnerUserGroupsDetailsComponent
      },
      {
        path: 'role-authorization',
        component: PartnerRoleAuthorizationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerSecurityRoutingModule { }
