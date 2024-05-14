import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CompanyUser } from 'src/app/data-access/models/company.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: 'app-company-contact-form',
  templateUrl: './company-contact-form.component.html',
  styleUrls: ['./company-contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyContactFormComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour:string

  @Output() onSave: EventEmitter<CompanyUser>;
  @Output() onClose: EventEmitter<void>;

  @Input() duplicateEmails: string[] = [];
  @Input() formTitle: string;
  @Input() subdomain: string;
  @Input() set contact(value: CompanyUser) {
    this.form.patchValue(value || {});
  }

  form: FormGroup;                            

  constructor(
    private readonly fb: FormBuilder,
    private activeModal: NgbActiveModal,
    protected readonly companyInfoService: CompanyInfoService,

  ) {
    this.primaryColour= companyInfoService.getCompanyInfo().primaryColour
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.onSave = new EventEmitter<CompanyUser>();
    this.onClose = new EventEmitter<void>();

    this.form = this.fb.group({
      userId: "new-record-01",
      firstName: ['', Validators.compose([
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.required
      ])],
      emailAddress: ['', Validators.compose([
        Validators.required,
        Validators.email,
        this.uniqueUserEmail
      ])],
      locationId: ['', Validators.compose([
        Validators.required
      ])],
      statusId: "",
      userRoleId: "not assigned"
    });
  }

  ngOnInit(): void { }

  private uniqueUserEmail = (c: AbstractControl): ValidationErrors => {
    if (!c.value) {
      return null;
    }

    const emails = (this.duplicateEmails || []).map((email) => email.toLowerCase());

    return emails.includes((c.value as string).toLowerCase()) ? { uniqueUserEmail: true } : null;
  }

  saveHander(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.onSave.emit(this.form.value);
  }

  closeHandler(): void {
    this.activeModal.dismiss()
  }
}
