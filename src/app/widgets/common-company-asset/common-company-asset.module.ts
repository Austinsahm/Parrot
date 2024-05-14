import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonWidgetsModule } from '../common-widgets/common-widgets.module';
import { BranchFieldComponent } from './branch-field/branch-field.component';
import { CompanyFieldComponent } from './company-field/company-field.component';
import { CompanyTypeFieldComponent } from './company-type-field/company-type-field.component';
import { AssetFieldComponent } from './asset-field/asset-field.component';
import { AssetTypeFieldComponent } from './asset-type-field/asset-type-field.component';
import { AddSensorModalComponent } from './add-sensor-modal/add-sensor-modal.component';
import { SensorFieldComponent } from './sensor-field/sensor-field.component';
import { SensorMeasureFieldComponent } from './sensor-measure-field/sensor-measure-field.component';
import { DeviceListDetailsComponent } from './device-list-details/device-list-details.component';
import { AddUserAlertModalComponent } from './add-user-alert-modal/add-user-alert-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BranchFieldComponent,
    CompanyFieldComponent,
    CompanyTypeFieldComponent,
    AssetFieldComponent,
    AssetTypeFieldComponent,
    AddSensorModalComponent,
    SensorFieldComponent,
    SensorMeasureFieldComponent,
    DeviceListDetailsComponent,
    AddUserAlertModalComponent
  ],
  imports: [
    CommonModule,
    CommonWidgetsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CommonWidgetsModule,
    BranchFieldComponent,
    CompanyFieldComponent,
    CompanyTypeFieldComponent,
    AssetFieldComponent,
    AssetTypeFieldComponent,
    SensorFieldComponent,
    DeviceListDetailsComponent
  ]
})
export class CommonCompanyAssetModule { }
