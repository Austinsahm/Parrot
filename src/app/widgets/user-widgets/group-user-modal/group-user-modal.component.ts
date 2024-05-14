import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormArray, FormControl, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { CompanyUser } from "src/app/data-access/models/company.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { UserGroup } from "src/app/data-access/models/group.model";
import { UserDataAccviceessorService } from "src/app/data-access/user-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";

@Component({
  selector: "app-group-user-modal",
  templateUrl: "./group-user-modal.component.html",
  styleUrls: ["./group-user-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupUserModalComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @Input() company: Domain;
  @Input() group: UserGroup;
  @Input() existingUserIds: string[] = [];

  control = new FormArray([]);
  values = [];

  options$: Observable<ComboBoxOption<string>[]> = of([]);

  mappings$ = of(new Map<string, CompanyUser>());
  private _members = new Map<string, CompanyUser>();

  constructor(
    private readonly dataAccessor: UserDataAccviceessorService,
    protected readonly companyInfoService: CompanyInfoService,
    public readonly modalRef: NgbActiveModal
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.options$ = this._createOptions();

    if (!this.control.length) {
      this.addControl();
    }

    this.control.valueChanges.subscribe((values: string[]) => {
      this.options$ = this._createOptions(values).pipe(shareReplay(1));

      this.mappings$ = this.dataAccessor
        .getAccessor(this.company?.companyId)
        .fetch()
        .pipe(
          map((users) => {
            this._members = new Map<string, CompanyUser>(
              users.map((user) => [user.firstName + " " + user.lastName, user])
            );
            return this._members;
          })
        )
        .pipe(shareReplay(1));
    });
  }

  private _createOptions(
    selections: string[] = []
  ): Observable<ComboBoxOption<string>[]> {
    return this.dataAccessor
      .getAccessor(this.company?.companyId)
      .fetch()
      .pipe(
        map((users) => {
          const nonExistingUsers = users.filter(
            (user) => !this.existingUserIds.includes(user.userId)
          );
          return nonExistingUsers.map((user) => {
            return {
              key: user.firstName + " " + user.lastName,
              value: user.firstName + " " + user.lastName,
              label: user.firstName + " " + user.lastName,
              disabled: selections.includes(
                user.firstName + " " + user.lastName
              ),
            };
          });
        })
      );
  }

  addControl(): void {
    this.control.push(
      new FormControl("", Validators.compose([Validators.required]))
    );
  }

  saveHandler(): void {
    const members = (this.control.value as string[]).map((userId) =>
      this._members.get(userId)
    );
    this.modalRef.close(members);
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
}
