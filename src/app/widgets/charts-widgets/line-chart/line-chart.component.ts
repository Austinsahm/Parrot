import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {

  @Input() attribute: string;
  @Input() xAxesValues: string[];
  @Input() yAxesValues: number[];


  public lineChartData: ChartDataSets[] = [
    { data: [10, -20, -15, -40, 45, -55], label: 'Series A', fill: false, borderWidth: 1},
  ];

  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      xAxes:[{gridLines:{display: true}, ticks: {display: false} }],
      yAxes:[{gridLines:{display: false}, ticks: {display: true} }],
    },
    
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(0,0,255,0.4)',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  ];

  public lineChartLegend = false;

  public lineChartType = 'line';

  constructor() { }

  ngAfterViewInit(): void { 

    this.displayLineChartOption(this.xAxesValues);

    this.lineChartData = [
      {data: [...this.yAxesValues], label: this.attribute, fill: false,  borderWidth: 3, pointRadius: 1}
    ]

    this.lineChartLabels = [
      ...this.xAxesValues
    ]

  }

  ngOnChanges(){

    this.displayLineChartOption(this.xAxesValues);
    
    this.lineChartData = [
      {data: [...this.yAxesValues], label: this.attribute, fill: false,  borderWidth: 1, pointRadius: 1}
    ]

    this.lineChartLabels = [
      ...this.xAxesValues
    ]
  }

  displayLineChartOption(xAxesValues: string[]){

    let len = xAxesValues.length;

    let displayXaxes = true; //len <= 20? true : false;

    this.lineChartOptions = {
      responsive: true,
      scales:{
        xAxes:[{gridLines:{display: true}, ticks: {display: displayXaxes} }],
        yAxes:[{gridLines:{display: false}, ticks: {display: true} }],
      }
    }
  }

}