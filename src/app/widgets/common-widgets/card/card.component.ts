import { Component, Input, OnInit } from "@angular/core";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() hover: boolean = true;
  @Input() height: any;
  @Input() width: any;
  @Input() marginLeft: any;
  @Input() actHeight: any;

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constructor(private companyInfoService: CompanyInfoService) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {}
}
