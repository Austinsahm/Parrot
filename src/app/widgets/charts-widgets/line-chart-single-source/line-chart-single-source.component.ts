import { Component, Input, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-line-chart-single-source",
  templateUrl: "./line-chart-single-source.component.html",
  styleUrls: ["./line-chart-single-source.component.scss"],
})
export class LineChartSingleSourceComponent implements OnInit {
  @Input() data: any;
  @Input() brushes: any;
  formFont: string;

  arr = [];
  chartOptions: ComboBoxOption<string>[];
  chartType: string;

  // public data: any[];

  constructor(private readonly companyInfoService: CompanyInfoService) {
    this.chartOptions = [
      { key: "Area", value: "Area", label: "Area" },
      { key: "Line", value: "Line", label: "Line" },
      { key: "Column", value: "Column", label: "Column" },
      { key: "Point", value: "Point", label: "Point" },
      { key: "Spline", value: "Spline", label: "Spline" },
      { key: "SplineArea", value: "SplineArea", label: "SplineArea" },
      { key: "StepArea", value: "StepArea", label: "StepArea" },
      { key: "StepLine", value: "StepLine", label: "StepLine" },
      { key: "Waterfall", label: "Waterfall", value: "Waterfall" },
    ];

    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    // this.data = [
    //   {Time: "2021-10-15 11:44:47.0", Temperature_Min: 23},
    //   {Time: "2021-10-16 11:44:47.0", Temperature_Min: 13},
    //   {Time: "2021-10-17 11:44:47.0", Temperature_Min: 33},
    //   {Time: "2021-10-18 11:44:47.0", Temperature_Min: 53},
    // ]
  }

  ngOnInit(): void {
    this.arr = Object.keys(this.data).map((key) => {
      return this.data[key];
    });
  }

  changeChart(e: MatSelectChange) {
    this.chartType = e.value;
  }
}
