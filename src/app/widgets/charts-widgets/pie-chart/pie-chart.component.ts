import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() label: string;
  @Input() percentage: number;

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

    let percentageCal = this.percentage < 0 ? (0-this.percentage) : this.percentage;

    this.pieChartLabels = [this.label, ''];

    this.pieChartData = [
      [percentageCal, (100 - percentageCal)]
    ];
  }

}
