import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonWidgetsModule } from '../common-widgets/common-widgets.module';
import { DeviceManufacturerFieldComponent } from './device-manufacturer-field/device-manufacturer-field.component';
import { DataAccessModule } from 'src/app/data-access/data-access.module';
import { DeviceCategoryFieldComponent } from './device-category-field/device-category-field.component';
import { AssetWidgetsModule } from '../asset-widgets/asset-widgets.module';
import { DeviceNetworkFieldComponent } from './device-network-field/device-network-field.component';
import { DeviceManufacturerTypeFieldComponent } from './device-manufacturer-type-field/device-manufacturer-type-field.component';
import { UseCaseFieldComponent } from './use-case-field/use-case-field.component';


@NgModule({
  declarations: [
    DeviceManufacturerFieldComponent,
    DeviceCategoryFieldComponent,
    DeviceNetworkFieldComponent,
    DeviceManufacturerTypeFieldComponent,
    UseCaseFieldComponent
  ],
  imports: [
    CommonModule,
    CommonWidgetsModule,
    AssetWidgetsModule,
    DataAccessModule
  ],
  exports: [
    CommonWidgetsModule,
    AssetWidgetsModule,
    DeviceManufacturerFieldComponent,
    DeviceCategoryFieldComponent,
    DeviceNetworkFieldComponent,
    DeviceManufacturerTypeFieldComponent,
    UseCaseFieldComponent
  ]
})
export class DeviceWidgetsModule { }
