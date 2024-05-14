import { Component, Input, OnInit } from "@angular/core";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"],
})
export class TextInputComponent implements OnInit {
  @Input() formControl: FormControl;
  @Input() placeholder: string;
  @Input() type = "text";
  @Input() readOnly = false;

  formFontColor: string;
  formBgColor: string;
  formFont: string;
  constructor(protected readonly companyInfoService: CompanyInfoService) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    console.log(this.formControl.value);
  }

  dirtyErrors() {
    const { dirty, errors, touched } = this.formControl;
    return dirty && touched && errors;
  }
}
