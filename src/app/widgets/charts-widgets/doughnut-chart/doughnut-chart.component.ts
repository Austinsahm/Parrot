import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() label: string;
  @Input() percentage: number;

  doughnutChartType: ChartType = 'doughnut';

  doughnutChartLabels: Label[];

  doughnutChartData: MultiDataSet;

  doughnutOptions: ChartOptions = {
    cutoutPercentage: 70,
  }

  backgroundColor: Color[] = [
    {
      backgroundColor: [ 'rgba(40, 150, 114, 0.9)', 'rgba(178, 177, 185, 0.9)']
    },
  ]

  constructor() { }

  ngOnInit(): void {

    let percentageCal = this.percentage < 0 ? (0-this.percentage) : this.percentage;

    this.doughnutChartLabels = [this.label, ''];

    this.doughnutChartData = [
      [percentageCal, (100 - percentageCal)]
    ];
  }

}
