import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkerIconFieldComponent } from './marker-icon-field/marker-icon-field.component';
import { VisualizationFieldComponent } from './visualization-field/visualization-field.component';
import { StaticChartFieldComponent } from './static-chart-field/static-chart-field.component';
import { TimeChartFieldComponent } from './time-chart-field/time-chart-field.component';
import { DashboardTypeFieldComponent } from './dashboard-type-field/dashboard-type-field.component';
import { OwnerFieldComponent } from './owner-field/owner-field.component';
import { ChartsWidgetsModule } from '../charts-widgets/charts-widgets.module';
import { CommonWidgetsModule } from '../common-widgets/common-widgets.module';
import { DashboardDeviceFieldComponent } from './dashboard-device-field/dashboard-device-field.component';



@NgModule({
  declarations: [MarkerIconFieldComponent, VisualizationFieldComponent, StaticChartFieldComponent, TimeChartFieldComponent, DashboardTypeFieldComponent, OwnerFieldComponent, DashboardDeviceFieldComponent],
  imports: [
    CommonWidgetsModule,
    CommonModule,
    ChartsWidgetsModule
  ],
  exports: [
    ChartsWidgetsModule,
    MarkerIconFieldComponent,
    VisualizationFieldComponent,
    StaticChartFieldComponent,
    TimeChartFieldComponent,
    DashboardTypeFieldComponent,
    OwnerFieldComponent,
    DashboardDeviceFieldComponent
  ]
})
export class DashboardWidgetsModule { }
