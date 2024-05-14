import { Component, AfterViewInit, ViewChild, Input } from "@angular/core";
import { SweepDirection } from "igniteui-angular-core";
import { IgxRadialGaugeComponent } from "igniteui-angular-gauges";
import { IgxRadialGaugeRangeComponent } from "igniteui-angular-gauges";
import { RadialGaugeBackingShape } from "igniteui-angular-gauges";
import { RadialGaugeNeedleShape } from "igniteui-angular-gauges";
import { RadialGaugePivotShape } from "igniteui-angular-gauges";
import { RadialGaugeScaleOversweepShape } from "igniteui-angular-gauges";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { changeAttributeValueGuage } from "src/app/services/utilities";

@Component({
  selector: "app-radial-gauge-chart",
  templateUrl: "./radial-gauge-chart.component.html",
  styleUrls: ["./radial-gauge-chart.component.scss"],
})
export class RadialGaugeChartComponent implements AfterViewInit {
  @Input() data: any;
  @Input() card: boolean;
  @Input() height = "330px";

  intervals: number;
  formBgColor: string;
  formColor: string;
  formFont: string;

  @ViewChild("radialGauge", { static: true })
  radialGauge: IgxRadialGaugeComponent;

  constructor(protected readonly companyInfoService: CompanyInfoService) {
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit() {
    this.title = changeAttributeValueGuage(this.data[2]?.title);
    if (this.card) this.intervals = this.data[0]?.Value / 2;
    else this.intervals = Math.floor(this.data[0]?.Value / 10);

    if (this.data[0].Value == "1") {
      this.intervals = this.data[0]?.Value / 10;
    }
  }

  ngAfterViewInit(): void {
    this.radialGauge.transitionDuration = 2000;
    this.animateGauge();
  }
  title: string;

  animateGauge(): void {
    this.radialGauge.height = this.height;
    this.radialGauge.width = "100%";
    this.radialGauge.minimumValue = this.data[1]?.Value;
    this.radialGauge.maximumValue = this.data[0]?.Value;
    this.radialGauge.value = this.data[2]?.Value;
    this.radialGauge.interval = this.intervals;

    // Label Settings
    this.radialGauge.labelExtent = 0.6;
    this.radialGauge.labelInterval = this.intervals;
    this.radialGauge.font = "10px Verdana,Arial";

    // Scale Settings
    this.radialGauge.scaleStartAngle = 150;
    this.radialGauge.scaleEndAngle = 30;
    this.radialGauge.scaleBrush = "#0b8fed";
    this.radialGauge.scaleOversweepShape = RadialGaugeScaleOversweepShape.Auto;
    this.radialGauge.scaleSweepDirection = SweepDirection.Clockwise;
    this.radialGauge.scaleEndExtent = 0.825;
    this.radialGauge.scaleStartExtent = 0.775;

    this.radialGauge.minorTickStartExtent = 0.7;
    this.radialGauge.minorTickEndExtent = 0.75;
    this.radialGauge.tickStartExtent = 0.675;
    this.radialGauge.tickEndExtent = 0.75;

    // Backing Settings
    this.radialGauge.backingShape = RadialGaugeBackingShape.Fitted;
    this.radialGauge.backingBrush = "#fcfcfc";
    this.radialGauge.backingOutline = "#d6d6d6";
    this.radialGauge.backingOversweep = 5;
    this.radialGauge.backingCornerRadius = 10;
    this.radialGauge.backingOuterExtent = 0.9;

    // Needle Settings
    this.radialGauge.needleShape = RadialGaugeNeedleShape.NeedleWithBulb;
    this.radialGauge.needlePivotShape = RadialGaugePivotShape.CircleOverlay;
    this.radialGauge.needleEndExtent = 0.5;
    this.radialGauge.needlePointFeatureExtent = 0.3;
    this.radialGauge.needlePivotWidthRatio = 0.2;
    this.radialGauge.needleBrush = "#9f9fa0";
    this.radialGauge.needleOutline = "#9f9fa0";
    this.radialGauge.needlePivotBrush = "#9f9fa0";
    this.radialGauge.needlePivotOutline = "#9f9fa0";

    // TickMark Settings
    this.radialGauge.tickBrush = "rgba(51, 51, 51, 1)";
    this.radialGauge.minorTickBrush = "rgba(73, 73, 73, 1)";
    this.radialGauge.minorTickCount = 6;

    this.radialGauge.ranges.clear();
  }
}
