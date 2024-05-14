import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchDeviceGeofenceComponent } from "./search-device-geofence/search-device-geofence.component";
import { CreateGeofenceComponent } from "./create-geofence/create-geofence.component";
import { TraceDeviceGeofenceComponent } from "./trace-device-geofence/trace-device-geofence.component";
import { CommonWidgetsModule } from "../common-widgets/common-widgets.module";
import { MatIconModule } from "@angular/material/icon";
import { DeviceWidgetsModule } from "../device-widgets/device-widgets.module";
import { DashboardWidgetsModule } from "../dashboard-widgets/dashboard-widgets.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatInputModule } from "@angular/material/input";
import { CreateEditGeofenceComponent } from "./create-edit-geofence/create-edit-geofence.component";

@NgModule({
  declarations: [
    SearchDeviceGeofenceComponent,
    CreateGeofenceComponent,
    TraceDeviceGeofenceComponent,
    CreateEditGeofenceComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CommonWidgetsModule,
    DeviceWidgetsModule,
    DashboardWidgetsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
  ],
  exports: [
    SearchDeviceGeofenceComponent,
    TraceDeviceGeofenceComponent,
    CreateGeofenceComponent,
    CreateEditGeofenceComponent,
  ],
  providers: [{ provide: Window, useValue: window }], //access window object in gmaps comp
})
export class GeofencingModule {}
