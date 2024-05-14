import { Component, OnInit, Input } from "@angular/core";
import { CompanyInfoService } from "src/app/services/company-info.service";

enum TitleSize {
  lg = "lg",
  md = "md",
}

@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"],
})
export class TitleComponent implements OnInit {
  @Input() title: string;
  @Input() size: TitleSize;

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constructor(private readonly companyInfoService: CompanyInfoService) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {}
}
