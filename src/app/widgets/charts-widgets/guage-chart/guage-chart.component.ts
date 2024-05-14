import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, } from 'chart.js';
import { Label, MultiDataSet,Color  } from 'ng2-charts';

@Component({
  selector: 'app-guage-chart',
  templateUrl: './guage-chart.component.html',
  styleUrls: ['./guage-chart.component.scss']
})
export class GuageChartComponent implements OnInit {

  @Input() label: string;
  @Input() percentage: number;

  doughnutChartType: ChartType = 'doughnut';

  doughnutChartLabels: Label[];

  doughnutChartData: MultiDataSet;

  guageOptions: ChartOptions = {
    circumference: Math.PI,
    rotation: Math.PI,
    cutoutPercentage: 80,
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
