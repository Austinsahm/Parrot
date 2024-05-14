import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonWidgetsModule } from "../common-widgets/common-widgets.module";
import { DataAccessModule } from "src/app/data-access/data-access.module";
import { AssetFormComponent } from "./asset-form/asset-form.component";
import { CommonCompanyAssetModule } from "../common-company-asset/common-company-asset.module";
import { AssetDeviceListComponent } from "./asset-device-list/asset-device-list.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModalModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AssetDetailViewerComponent } from "./asset-detail-viewer/asset-detail-viewer.component";
import { AssetDeviceModalComponent } from "./asset-device-modal/asset-device-modal.component";
import { DeviceFieldComponent } from "./device-field/device-field.component";
import { AssetFloorViewerComponent } from "./asset-floor-viewer/asset-floor-viewer.component";
import { AssetFloorModalComponent } from "./asset-floor-modal/asset-floor-modal.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxColorsModule } from "ngx-colors";

@NgModule({
  declarations: [
    AssetFormComponent,
    AssetDeviceListComponent,
    AssetDetailViewerComponent,
    AssetDeviceModalComponent,
    DeviceFieldComponent,
    AssetFloorViewerComponent,
    AssetFloorModalComponent,
  ],
  imports: [
    CommonModule,
    CommonWidgetsModule,
    DataAccessModule,
    CommonCompanyAssetModule,
    NgxDatatableModule,
    NgbTooltipModule,
    NgbModalModule,
    MatFormFieldModule,
    MatInputModule,
    NgxColorsModule,
  ],
  exports: [
    AssetFormComponent,
    AssetDetailViewerComponent,
    AssetDeviceModalComponent,
    DeviceFieldComponent,
    CommonCompanyAssetModule,
    NgbModalModule,
  ],
})
export class AssetWidgetsModule {}
