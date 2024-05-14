import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficePageComponent } from './back-office-page/back-office-page.component';
import { BackOfficeSetupComponent } from './back-office-setup/back-office-setup.component';
import { BackOfficeReportsComponent } from './back-office-reports/back-office-reports.component';
import { BackOfficeSecurityComponent } from './back-office-security/back-office-security.component';
import { BackOfficeCountriesComponent } from './back-office-countries/back-office-countries.component';
import { BackOfficeStatesComponent } from './back-office-states/back-office-states.component';
import { BackOfficeCitiesComponent } from './back-office-cities/back-office-cities.component';
import { BackOfficeManufacturersComponent } from './back-office-manufacturers/back-office-manufacturers.component';
import { BackOfficeManufacturerDeviceTypesComponent } from './back-office-manufacturer-device-types/back-office-manufacturer-device-types.component';
import { LayoutModule } from 'src/app/widgets/layout/layout.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BackOfficeCountryDetailsComponent } from './back-office-country-details/back-office-country-details.component';
import { LocationWidgetsModule } from 'src/app/widgets/location-widgets/location-widgets.module';
import { BackOfficeCountryCreateComponent } from './back-office-country-create/back-office-country-create.component';


@NgModule({
  declarations: [
    BackOfficePageComponent, 
    BackOfficeSetupComponent, 
    BackOfficeReportsComponent, 
    BackOfficeSecurityComponent, 
    BackOfficeCountriesComponent, 
    BackOfficeStatesComponent, 
    BackOfficeCitiesComponent, 
    BackOfficeManufacturersComponent, 
    BackOfficeManufacturerDeviceTypesComponent, 
    BackOfficeCountryDetailsComponent, 
    BackOfficeCountryCreateComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    LocationWidgetsModule,
    NgxDatatableModule,
    BackOfficeRoutingModule
  ]
})
export class BackOfficeModule { }
