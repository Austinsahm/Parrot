import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyTypeCode } from "src/app/data-access/models/company.model";
import { UserGroup } from "src/app/data-access/models/group.model";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-user-group-form",
  templateUrl: "./user-group-form.component.html",
  styleUrls: ["./user-group-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupFormComponent implements OnInit {
  @Input() set group(value: UserGroup) {
    this.form.patchValue(value || {});
  }
  @Input() isAddModal: boolean = false;

  form: FormGroup;
  subdomain: string;
  companyType: string;
  companyName: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly companyInfoService: CompanyInfoService
  ) {
    this.companyType = this.companyInfoService.getCompanyInfo().companyType;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.companyName = companyInfoService.getCompanyInfo().companyName;

    this.form = this.fb.group({
      roleName: ["", Validators.compose([Validators.required])],
      roleDesc: ["", Validators.compose([Validators.required])],
      statusId: ["", Validators.compose([Validators.required])],
      companyName: [""],
    });

    if (this.companyType === CompanyTypeCode.PARTNER) {
      this.form.addControl(
        "company",
        this.fb.group({
          companyId: [
            this.subdomain,
            Validators.compose([Validators.required]),
          ],
        })
      );
    } 
  }

  ngOnInit(): void {
    if (this.companyType !== CompanyTypeCode.PARTNER) {
      this.form.patchValue({ companyName: this.companyName });
    }
  }
}
