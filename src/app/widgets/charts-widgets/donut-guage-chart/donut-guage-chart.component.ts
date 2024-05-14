import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-donut-guage-chart",
  templateUrl: "./donut-guage-chart.component.html",
  styleUrls: ["./donut-guage-chart.component.scss"],
})
export class DonutGuageChartComponent implements OnInit {
  @Input() data: any;

  title: string[];
  donutData: { Label: string; Value: number; Summary: string }[];

  constructor() {}

  ngOnInit(): void {
    this.donutData = Object.keys(this.data).map((key) => {
      return this.data[key];
    });
    let t = this.donutData[0].Label.split(" ");
    t.splice(0, 1);
    // let comma = t.indexOf(',')
    // t.splice(comma, 1)
    this.title = t;
  }

  chartSliceClickEvent(e: any): void {
    e.args.isExploded = !e.args.isExploded;
  }
}
