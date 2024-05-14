import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeviceManagementComponent} from './device-management/device-management.component';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceNewComponent} from './device-new/device-new.component';
import {DeviceDetailComponent} from './device-detail/device-detail.component';
import {DeviceCategoryListComponent} from './device-category-list/device-category-list.component';
import {DeviceCategoryNewComponent} from './device-category-new/device-category-new.component';
import {DeviceCategoryDetailComponent} from './device-category-detail/device-category-detail.component';


const routes: Routes = [
  {
    path: '',
    component: DeviceManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'device',
        pathMatch: 'full'
      },
      {
        path: 'device',
        children: [
          {
            path: '',
            redirectTo: 'device-list',
            pathMatch: 'full'
          },
          {
            path: 'device-list',
            component: DeviceListComponent
          },
          {
            path: 'device-new',
            component: DeviceNewComponent
          },
          {
            path: 'device-detail/:id/companyId/:companyId',
            component: DeviceDetailComponent
          }
        ]
      },
      {
        path: 'device-category',
        children: [
          {
            path: '',
            redirectTo: 'device-category-list',
            pathMatch: 'full'
          },
          {
            path: 'device-category-list',
            component: DeviceCategoryListComponent
          },
          {
            path: 'device-category-new',
            component: DeviceCategoryNewComponent
          },
          {
            path: 'device-category-detail/:id',
            component: DeviceCategoryDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceManagementRoutingModule { }
