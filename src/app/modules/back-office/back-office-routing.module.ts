import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'src/app/error-pages/not-found/not-found.component';
import { BackOfficeCitiesComponent } from './back-office-cities/back-office-cities.component';
import { BackOfficeCountriesComponent } from './back-office-countries/back-office-countries.component';
import { BackOfficeCountryCreateComponent } from './back-office-country-create/back-office-country-create.component';
import { BackOfficeCountryDetailsComponent } from './back-office-country-details/back-office-country-details.component';
import { BackOfficeManufacturerDeviceTypesComponent } from './back-office-manufacturer-device-types/back-office-manufacturer-device-types.component';
import { BackOfficeManufacturersComponent } from './back-office-manufacturers/back-office-manufacturers.component';
import { BackOfficePageComponent } from './back-office-page/back-office-page.component';
import { BackOfficeSecurityComponent } from './back-office-security/back-office-security.component';
import { BackOfficeSetupComponent } from './back-office-setup/back-office-setup.component';
import { BackOfficeStatesComponent } from './back-office-states/back-office-states.component';


const routes: Routes = [
  {
    path: '',
    component: BackOfficePageComponent,
    children: [
      { path: '', redirectTo: 'setup', pathMatch: 'full' },
      {
        path: 'setup',
        component: BackOfficeSetupComponent,
        children: [
          { path: '', redirectTo: 'countries', pathMatch: 'full' },
          {
            path: 'countries',
            component: BackOfficeCountriesComponent
          },
          {
            path: 'countries/new',
            component: BackOfficeCountryCreateComponent
          },
          {
            path: 'countries/:country/details',
            component: BackOfficeCountryDetailsComponent
          },
          {
            path: 'states',
            component: BackOfficeStatesComponent
          },
          {
            path: 'cities',
            component: BackOfficeCitiesComponent
          },
          {
            path: 'manufacturers',
            component: BackOfficeManufacturersComponent
          },
          {
            path: 'manufacturer-device-types',
            component: BackOfficeManufacturerDeviceTypesComponent
          }
        ]
      },
      {
        path: 'security',
        component: BackOfficeSecurityComponent,
        children: []
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then(module => module.ReportsModule)
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
