import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { UserDataAccviceessorService } from "src/app/data-access/user-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { ComboBoxOption, PasswordChangeDetails } from "../types";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-password-change",
  templateUrl: "./password-change.component.html",
  styleUrls: ["./password-change.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangeComponent implements OnInit {
  @Output() onSave: EventEmitter<PasswordChangeDetails>;

  @Input() set subdomain(value: string) {
    this.users$ = this.dataAccessor
      .getAccessor(value)
      .fetch()
      .pipe(
        map((users) => {
          return users.map((user) => ({
            key: user.userId,
            value: user.loginId,
            label: user.loginId,
          }));
        })
      );
  }

  @Input() selectable = false;

  @Input() set loginIn(value: string) {
    this.form.patchValue({ loginId: value });
  }

  @Input() userId: string;

  users$: Observable<ComboBoxOption<string>[]> = of([]);
  form: FormGroup;
  permission$: Observable<CorporatePermissionCategory>;
  primaryColour: string;
  secondaryColour: string;

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dataAccessor: UserDataAccviceessorService,
    private sessionService: SessionStorageService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly userInfoService: UserInfoService
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.onSave = new EventEmitter<PasswordChangeDetails>();

    this.form = this.fb.group({
      loginId: ["", Validators.compose([Validators.required])],
      userId: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      confirmation: [
        "",
        Validators.compose([Validators.required, this.passwordMismatch]),
      ],
    });
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.userId = userInfoService.getUserInfo().userId;
  }

  private passwordMismatch = (c: AbstractControl): ValidationErrors => {
    if (!c.value) {
      return null;
    }

    return this.form.get("password").value === c.value
      ? null
      : { passwordMismatch: true };
  };

  ngOnInit(): void {
    if (this.userId) {
      this.form.patchValue({ userId: this.userId });
    }    
  }

  saveHandler(): void {
    if (this.form.invalid) {
      return;
    }

    const { loginId, userId, password } = this.form.value;
    const data = { loginId, userId, password };

    this.onSave.emit(data);
  }
}
