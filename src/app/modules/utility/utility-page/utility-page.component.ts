import { Component, OnInit } from "@angular/core";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-utility-page",
  templateUrl: "./utility-page.component.html",
  styleUrls: ["./utility-page.component.scss"],
})
export class UtilityPageComponent implements OnInit {
  formBgColor: string;
  constructor(private readonly companyInfoService: CompanyInfoService) {
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
  }

  ngOnInit(): void {}
}
