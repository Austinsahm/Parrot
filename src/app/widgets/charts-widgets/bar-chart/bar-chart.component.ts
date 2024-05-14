import { Component, Input, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterContentInit {

  @Input() attribute: string;
  @Input() xAxesValues: string[];
  @Input() yAxesValues: number[];


  public barChartData: ChartDataSets[] = [
    { data: [10, -20, -15, -40, 45, -55], label: 'Series A', fill: false, borderWidth: 1},
  ];

  public barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // scales:{
    //   xAxes:[{gridLines:{display: true}, ticks: {display: false} }],
    //   yAxes:[{gridLines:{display: false}, ticks: {display: true} }],
    // },
    
  };

  public barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  public barChartLegend = false;

  public barChartType = 'bar';

  constructor() { }

  ngAfterContentInit (): void { 

    this.displayBarChartOption(this.xAxesValues);

    this.barChartData = [
      {data: [...this.yAxesValues], label: this.attribute, fill: false, weight:10,  borderWidth: 2, pointRadius: 1, backgroundColor: "rgba(46,76,109,1)", borderColor: "rgba(46,76,109,1)" }
    ]

    this.barChartLabels = [
      ...this.xAxesValues
    ]

  }

  displayBarChartOption(xAxesValues: string[]){

    let len = xAxesValues.length;

    let displayXaxes = len <= 10? true : false;

    this.barChartOptions = {
      responsive: true,
      scales:{
        xAxes:[{gridLines:{display: true}, ticks: {display: displayXaxes, fontSize: 15, fontStyle: "bold" } }],
        yAxes:[{gridLines:{display: false}, ticks: {display: true, fontSize: 15, fontStyle: "bold"} }],
      }
    }
  }

}
