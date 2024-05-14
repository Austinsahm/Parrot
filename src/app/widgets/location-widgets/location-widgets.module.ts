import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StateFieldComponent } from "./state-field/state-field.component";
import { CityFieldComponent } from "./city-field/city-field.component";
import { CountryFieldComponent } from "./country-field/country-field.component";
import { DataAccessModule } from "src/app/data-access/data-access.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonWidgetsModule } from "../common-widgets/common-widgets.module";
import { CountryFormComponent } from "./country-form/country-form.component";
import { StateListTableComponent } from "./state-list-table/state-list-table.component";
import { CityListTableComponent } from "./city-list-table/city-list-table.component";
import { StateFormComponent } from "./state-form/state-form.component";
import { DeviceGeolocationComponent } from "./device-geolocation/device-geolocation.component";
import { DeviceAssetTrackerComponent } from "./device-asset-tracker/device-asset-tracker.component";
import { DeviceTracingComponent } from "./device-tracing/device-tracing.component";
import { DeviceLocationComponent } from "./device-location/device-location.component";
import { DeviceAssetTracingComponent } from "./device-asset-tracing/device-asset-tracing.component";

@NgModule({
  declarations: [
    StateFieldComponent,
    CityFieldComponent,
    CountryFieldComponent,
    CountryFormComponent,
    StateListTableComponent,
    CityListTableComponent,
    StateFormComponent,
    DeviceGeolocationComponent,
    DeviceAssetTrackerComponent,
    DeviceTracingComponent,
    DeviceLocationComponent,
    DeviceAssetTracingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataAccessModule,
    CommonWidgetsModule,
  ],
  exports: [
    CommonWidgetsModule,
    StateFieldComponent,
    CityFieldComponent,
    CountryFieldComponent,
    CountryFormComponent,
    StateListTableComponent,
    CityListTableComponent,
    StateFormComponent,
    DeviceGeolocationComponent,
    DeviceAssetTrackerComponent,
    DeviceTracingComponent,
    DeviceLocationComponent,
    DeviceAssetTracingComponent,
  ],
})
export class LocationWidgetsModule {}
