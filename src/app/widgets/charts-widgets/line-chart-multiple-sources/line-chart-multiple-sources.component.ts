import { Component, Input, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-line-chart-multiple-sources",
  templateUrl: "./line-chart-multiple-sources.component.html",
  styleUrls: ["./line-chart-multiple-sources.component.scss"],
})
export class LineChartMultipleSourcesComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() title: string;
  @Input() brushes: any;
  formFont: string;

  chartOptions: ComboBoxOption<string>[];
  chartType: string;
  formBgColor: string;
  formColor: string;


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
  }

  ngOnInit(): void {
    for (var i = 0; i <= this.data.length; i++) {
      for (var key in this.data[i]) {
        if (key !== "time") {
          this.data.forEach((a) => (a[key] = +a[key]));
        }
      }
    }
  }

  changeChart(e: MatSelectChange) {
    this.chartType = e.value;
    console.log(this.chartType);
  }
}
