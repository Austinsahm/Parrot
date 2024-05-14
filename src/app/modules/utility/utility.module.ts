import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityPageComponent } from './utility-page/utility-page.component';
import { BulkDeviceLoadComponent } from './bulk-device-load/bulk-device-load.component';
import { UtilityRoutingModule } from './utility-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataAccessModule } from 'src/app/data-access/data-access.module';
import { DeviceWidgetsModule } from 'src/app/widgets/device-widgets/device-widgets.module';
import { CompanyWidgetsModule } from 'src/app/widgets/company-widgets/company-widgets.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [UtilityPageComponent, BulkDeviceLoadComponent],
  imports: [
    CommonModule,
    UtilityRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule,
    NgxDatatableModule,
    NgxSkeletonLoaderModule,
    DataAccessModule,
    DeviceWidgetsModule,
    CompanyWidgetsModule,
    NgbTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class UtilityModule { }
