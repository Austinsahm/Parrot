import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-pie-guage-chart",
  templateUrl: "./pie-guage-chart.component.html",
  styleUrls: ["./pie-guage-chart.component.scss"],
})
export class PieGuageChartComponent implements OnInit {
  @Input() data: any[];
  @Input() height: string = "20vh";
  @Input() title: string;
  @Input() brushes: any;

  pieData: { Label: string; Value: number; Summary: string }[];

  constructor() {
    //   this.data = [
    //     { MarketShare : 25, Company : "Residential" },
    //     { MarketShare : 12, Company : "Heating" },
    //     { MarketShare : 8,  Company : "Lighting" },
    //     { MarketShare : 18, Company : "Other" },
    //     { MarketShare : 37, Company : "Cooling" }
    // ];
    // this.pieData = Object.keys(this.data).map((key) => {
    //   return this.data[key];
    // });
    // let t = this.pieData[0].Label.split(" ");
    // t.splice(0, 1);
    // this.title = t;
    // this.brushes = ["blue", "red"];
  }

  ngOnInit(): void {}
}
