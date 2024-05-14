import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GuageChartComponent } from "./guage-chart/guage-chart.component";
import { ChartsModule } from "ng2-charts";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { DoughnutChartComponent } from "./doughnut-chart/doughnut-chart.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { PieChartMainComponent } from "./pie-chart-main/pie-chart-main.component";
import { LineChartMultipleSourcesComponent } from "./line-chart-multiple-sources/line-chart-multiple-sources.component";
import {
  IgxCategoryChartModule,
  IgxDoughnutChartModule,
  IgxItemLegendModule,
  IgxLegendModule,
  IgxPieChartModule,
} from "igniteui-angular-charts";
import { CommonWidgetsModule } from "../common-widgets/common-widgets.module";
import { LineChartSingleSourceComponent } from "./line-chart-single-source/line-chart-single-source.component";
import { RadialGaugeChartComponent } from "./radial-gauge-chart/radial-gauge-chart.component";
import { IgxRadialGaugeModule } from "igniteui-angular-gauges";
import { DonutGuageChartComponent } from "./donut-guage-chart/donut-guage-chart.component";
import { PieGuageChartComponent } from "./pie-guage-chart/pie-guage-chart.component";
import { IgniteBarChartComponent } from './ignite-bar-chart/ignite-bar-chart.component';

@NgModule({
  declarations: [
    GuageChartComponent,
    LineChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    PieChartMainComponent,
    LineChartMultipleSourcesComponent,
    LineChartSingleSourceComponent,
    RadialGaugeChartComponent,
    DonutGuageChartComponent,
    PieGuageChartComponent,
    IgniteBarChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    IgxCategoryChartModule,
    IgxLegendModule,
    CommonWidgetsModule,
    IgxRadialGaugeModule,
    IgxDoughnutChartModule,
    IgxItemLegendModule,
    IgxPieChartModule,
  ],
  exports: [
    GuageChartComponent,
    LineChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    PieChartMainComponent,
    LineChartMultipleSourcesComponent,
    LineChartSingleSourceComponent,
    RadialGaugeChartComponent,
    DonutGuageChartComponent,
    PieGuageChartComponent,
    IgniteBarChartComponent,
  ],
})
export class ChartsWidgetsModule {}
