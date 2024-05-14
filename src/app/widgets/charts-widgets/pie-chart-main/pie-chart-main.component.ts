import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart-main',
  templateUrl: './pie-chart-main.component.html',
  styleUrls: ['./pie-chart-main.component.scss']
})
export class PieChartMainComponent implements OnInit {

  @Input() labels: string[];
  @Input() values: number[];

  pieChartType: ChartType = 'pie';

  pieChartLabels: Label[];

  pieChartData: MultiDataSet;

  backgroundColor: Color[] = [
    {
      backgroundColor: [ 'rgba(40, 150, 114, 0.9)', 'rgba(178, 177, 185, 0.9)']
    },
  ]

  constructor() { }

  ngOnInit(): void {

    this.pieChartLabels = [...this.labels];

    this.pieChartData = [
      [...this.values]
    ];
  }

}
