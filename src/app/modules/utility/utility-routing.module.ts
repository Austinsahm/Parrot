import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BulkDeviceLoadComponent } from './bulk-device-load/bulk-device-load.component';
import { UtilityPageComponent } from './utility-page/utility-page.component';

const routes: Routes = [
  {
    path: '',
    component: UtilityPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'device-load',
        pathMatch: 'full'
      },
      {
        path: 'device-load',
        children: [
          {
            path: '',
            component: BulkDeviceLoadComponent
          },
         
        ]
      },
      
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
