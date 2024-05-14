import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { BranchCreateModalComponent } from './branch-create-modal/branch-create-modal.component';
import { BranchUpdateModalComponent } from './branch-update-modal/branch-update-modal.component';
import { BranchWidgetService } from './branch-widget.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationWidgetsModule } from '../location-widgets/location-widgets.module';
import { CommonWidgetsModule } from '../common-widgets/common-widgets.module';
import { AssetWidgetsModule } from '../asset-widgets/asset-widgets.module';
import { CommonCompanyAssetModule } from '../common-company-asset/common-company-asset.module';
import { UserWidgetsModule } from '../user-widgets/user-widgets.module';
import { CompanyRoleFieldComponent } from './company-role-field/company-role-field.component';

@NgModule({
  declarations: [
    BranchFormComponent, 
    BranchCreateModalComponent, 
    BranchUpdateModalComponent, CompanyRoleFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonWidgetsModule,
    LocationWidgetsModule,
    CommonCompanyAssetModule,
    AssetWidgetsModule
  ],
  exports: [
    CommonCompanyAssetModule,
    AssetWidgetsModule,
    UserWidgetsModule,
    CompanyRoleFieldComponent
  ],
  providers: [
    BranchWidgetService,
    UserWidgetsModule
  ]
})
export class CompanyWidgetsModule { }
