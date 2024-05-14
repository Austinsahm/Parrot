import { Component, OnInit, Input } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import { UserAlert } from "src/app/data-access/models/alert-notification.model";
import { CompanyUser } from "src/app/data-access/models/company.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { UserDataAccviceessorService } from "src/app/data-access/user-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-add-user-alert-modal",
  templateUrl: "./add-user-alert-modal.component.html",
  styleUrls: ["./add-user-alert-modal.component.scss"],
})
export class AddUserAlertModalComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  @Input() category: UserAlert;
  @Input() set subdomain(value: string) {
    this._subdomain = value;
    this.users$ = this._createOptions(value, this.control.value).pipe(
      shareReplay(1)
    );
  }

  @Input() existingUsersId: string[] = [];

  companyName: string;
  _subdomain: string;
  form: FormGroup;
  control = new FormArray([]);
  values = [];

  users$: Observable<ComboBoxOption<string>[]> = of([]);
  permission$: Observable<CorporatePermissionCategory>;
  mappings$ = of(new Map<string, CompanyUser>());

  constructor(
    private readonly dataAccessor: UserDataAccviceessorService,
    private sessionService: SessionStorageService,
    private readonly modal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private readonly companyInfo: CompanyInfoService,
    private readonly userHttp: UserHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private toastService: ToastrService
  ) {
    this.companyName = companyInfo.getCompanyInfo().companyName;
    this.permission$ = this.sessionService.readPermission();
    this.form = this.fb.group({
      devices: this.fb.array([]),
    });
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {
    this.users$ = this._createOptions(this._subdomain, []);

    if (!this.control.length) {
      this.addControl();
    }

    this.control.valueChanges.subscribe((values: string[]) => {
      this.users$ = this._createOptions(this._subdomain, values).pipe(
        shareReplay(1)
      );

      this.mappings$ = this.dataAccessor
        .getAccessor(this._subdomain)
        .fetch()
        .pipe(
          map((alerts) => {
            return new Map<string, CompanyUser>(
              alerts.map((user) => [user.userId, user])
            );
          })
        )
        .pipe(shareReplay(1));
    });
  }

  addControl(): void {
    this.control.push(
      new FormControl("", Validators.compose([Validators.required]))
    );
  }

  _createOptions(
    subdomain: string,
    selections: string[]
  ): Observable<ComboBoxOption<string>[]> {
    if (!subdomain) {
      return of([]);
    }
    return this.dataAccessor
      .getAccessor(subdomain)
      .fetch()
      .pipe(
        map((users) => {
          const nonexistingUsers = users.filter(
            (user) => !this.existingUsersId.includes(user.userId)
          );
          return nonexistingUsers.map((user) => ({
            key: user.userId,
            value: user.loginId,
            label: user.loginId,
            disabled: selections.includes(user.userId),
          }));
        })
      );
  }

  deleteHandler(index: number): void {
    this.control.removeAt(index);

    if (!this.control.length) {
      this.addControl();
    }
  }

  onSelect(val: MatSelectChange, index: number) {
    this.values.splice(index, 1, val.value);
    this.control.setValue(this.values);
  }

  saveHandler() {
    const source$ = this.mappings$.pipe(
      map((mappings) => {
        return (this.control.value as string[]).map((curId) =>
          mappings.get(curId)
        );
      })
    );

    source$.subscribe(this.modal.close, (error) => {
      if (!error.status)
        this.toastService.error("You might be offline", "Request Failed");
      else this.toastService.error("Unknown Error", "");
    });
  }

  closeHandler() {
    this.modal.close();
  }
}
