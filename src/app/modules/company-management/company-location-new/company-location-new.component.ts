import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { UserInfoService } from "../../../services/user-info.service";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-company-location-new",
  templateUrl: "./company-location-new.component.html",
  styleUrls: ["./company-location-new.component.scss"],
})
export class CompanyLocationNewComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @Input() duplicateNames: string[] = [];
  @Input() companyName: string;

  locationForm: FormGroup;
  parentCompany: string;

  constructor(
    private activeModal: NgbActiveModal,
    private userInfoService: UserInfoService,
    private formBuilder: FormBuilder,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = companyInfoService.getCompanyInfo().primaryColour;

    this.locationForm = this.formBuilder.group({
      locationId: "new-record-01",
      locationName: new FormControl("", [Validators.required, this.uniqueName]),
      locationAddress1: new FormControl("", [Validators.required]),
      locationAddress2: new FormControl(""),
      locationDesc: new FormControl(""),
      stateId: new FormControl("", [Validators.required]),
      cityId: new FormControl("", [Validators.required]),
      postalCode: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.parentCompany = this.userInfoService.getUserInfo().companyName;
  }

  private uniqueName = (c: AbstractControl): ValidationErrors => {
    if (!c.value) {
      return null;
    }

    const names = (this.duplicateNames || []).map((name) => name.toLowerCase());

    return names.includes((c.value as string).toLowerCase())
      ? { uniqueName: true }
      : null;
  };

  close() {
    this.activeModal.close();
  }

  save() {
    if (this.locationForm.invalid) {
      return;
    }
    this.activeModal.close(this.locationForm.value);
  }
}
