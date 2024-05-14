import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyTypeCode } from "../data-access/models/company.model";
import { UserInfoService } from "../services/user-info.service";
import { UserSessionInformation } from "../services/user.service";
import { ChartOptions, ChartType } from "chart.js";
import { Color, Label, MultiDataSet } from "ng2-charts";
import { CompanyInfoService } from "../services/company-info.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;
  session: UserSessionInformation;

  totalDevice: number;

  totalInactiveDevice: number;

  totalActiveDevice: number;

  pieChartType: ChartType = "pie";

  // pieChartLabels: Label[];

  // pieChartData: MultiDataSet;

  pieChartData: any[];

  backgroundColor: Color[] = [
    {
      backgroundColor: ["rgba(40, 150, 114, 0.9)", "rgba(178, 177, 185, 0.9)"],
    },
  ];

  // barChartType: ChartType = 'bar';

  // barChartLabels: Label[];

  barChartData: any[];

  label: string;
  chartColours: any[];

  constructor(
    private readonly router: Router,
    private readonly userInfoService: UserInfoService,
    private readonly companyInfoService: CompanyInfoService
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {
    this.session = this.userInfoService.getUserInfo();

    this.totalDevice =
      Number(this.session.numActiveDevice) +
      Number(this.session.numInactiveDevice);

    this.totalInactiveDevice =
      this.totalDevice - Number(this.session.numActiveDevice);

    this.totalActiveDevice =
      this.totalDevice - Number(this.session.numInactiveDevice);

    console.log(this.formFont);

    // console.log(this.session,this.totalActiveDevice,this.totalInactiveDevice,this.totalDevice);

    if (this._isCorporate(this.session)) {
      this.router.navigate(["corporate"]);
    }

    // this.pieChartLabels = ["Active Device", 'Inactive Device'];

    // this.pieChartData = [
    //   [this.session.numActiveDevice, this.session.numInactiveDevice]
    // ];

    // this.barChartLabels = ["Corporate", "Individual", "Partner"];

    // this.barChartData = [
    //   [this.session.numCorporate, this.session.numIndividual, this.session.numPartner],
    // ]

    const corp = +this.session.numCorporate;
    const ind = +this.session.numIndividual;
    const part = +this.session.numPartner;
    this.barChartData = [
      { label: "CORPORATE", value: corp },
      { label: "INDIVIDUAL", value: ind },
      { label: "PARTNER", value: part },
    ];

    this.pieChartData = [
      {
        Value:
          +this.session.numActiveDevice > 0
            ? +this.session.numActiveDevice + 3
            : +this.session.numActiveDevice,
        Label: `Active Devices`,
        Summary: `Active Devices: ${+this.session.numActiveDevice}`,
      },
      {
        Value:
          +this.session.numInactiveDevice >= 0
            ? +this.session.numInactiveDevice + 3
            : +this.session.numInactiveDevice,
        Label: `Inactive Devices`,
        Summary: `Inactive Devices: ${+this.session.numInactiveDevice}`,
      },
    ];
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.chartColours = [
      "#" + (this.primaryColour || "3D95F7"),
      "#" + (this.secondaryColour || "FAFA33"),
    ];
  }

  private _isCorporate(user: UserSessionInformation): boolean {
    return [CompanyTypeCode.CORPORATE, CompanyTypeCode.INDIVIDUAL].includes(
      user.companyTypeName as CompanyTypeCode
    );
  }
}
