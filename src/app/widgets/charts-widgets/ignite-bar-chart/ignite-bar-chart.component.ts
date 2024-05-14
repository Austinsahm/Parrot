import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-ignite-bar-chart",
  templateUrl: "./ignite-bar-chart.component.html",
  styleUrls: ["./ignite-bar-chart.component.scss"],
})
export class IgniteBarChartComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() title: string;
  @Input() height: string = "20vh";
  @Input() brushes: any;

  constructor() {
    // this.brushes = ["blue"];
  }

  ngOnInit(): void {
    // this.data = [
    //   {label: "ACTIVE", value: 25},
    //   {label: "INACTIVE", value: 45},
    // ]
  }
}
