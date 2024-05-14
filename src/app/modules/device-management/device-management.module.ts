import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeviceManagementRoutingModule } from "./device-management-routing.module";
import { DeviceManagementComponent } from "./device-management/device-management.component";
import { DeviceListComponent } from "./device-list/device-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModalModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { DeviceService } from "./device.service";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DeviceNewComponent } from "./device-new/device-new.component";
import { DeviceDetailComponent } from "./device-detail/device-detail.component";
import { DeviceCategoryListComponent } from "./device-category-list/device-category-list.component";
import { DeviceCategoryNewComponent } from "./device-category-new/device-category-new.component";
import { DeviceCategoryDetailComponent } from "./device-category-detail/device-category-detail.component";
import { DataAccessModule } from "src/app/data-access/data-access.module";
import { DeviceWidgetsModule } from "src/app/widgets/device-widgets/device-widgets.module";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { CompanyWidgetsModule } from "src/app/widgets/company-widgets/company-widgets.module";
import { DeviceCategoryDeviceModalComponent } from "./device-category-device-modal/device-category-device-modal.component";
import { DeviceMoreDetailModalComponent } from "./device-more-detail-modal/device-more-detail-modal.component";
import { CommonWidgetsModule } from "src/app/widgets/common-widgets/common-widgets.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    DeviceManagementComponent,
    DeviceListComponent,
    DeviceNewComponent,
    DeviceDetailComponent,
    DeviceCategoryListComponent,
    DeviceCategoryNewComponent,
    DeviceCategoryDetailComponent,
    DeviceCategoryDeviceModalComponent,
    DeviceMoreDetailModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule,
    NgxDatatableModule,
    NgxSkeletonLoaderModule,
    DeviceManagementRoutingModule,
    DataAccessModule,
    DeviceWidgetsModule,
    CompanyWidgetsModule,
    NgbTooltipModule,
    CommonWidgetsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [DeviceService],
})
export class DeviceManagementModule {}
