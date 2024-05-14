import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormArray, FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { UserGroup } from "src/app/data-access/models/group.model";
import { UserGroupDataAccessorService } from "src/app/data-access/user-group-data-accessor.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";

@Component({
  selector: "app-user-group-modal",
  templateUrl: "./user-group-modal.component.html",
  styleUrls: ["./user-group-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGroupModalComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @Input() existingGroupIds: string[] = [];

  control = new FormArray([]);
  values = [];

  options$: Observable<ComboBoxOption<string>[]> = of([]);

  mappings$ = of(new Map<string, UserGroup>());
  private _groups = new Map<string, UserGroup>();

  constructor(
    private readonly dataAccessor: UserGroupDataAccessorService,
    public readonly modalRef: NgbActiveModal,
    protected readonly companyInfoService: CompanyInfoService
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
        .fetch()
        .pipe(
          map((groups) => {
            return new Map<string, UserGroup>(
              groups.map((group) => [group.roleId, group])
            );
          })
        )
        .pipe(tap((mappings) => (this._groups = mappings)))
        .pipe(shareReplay(1));
    });
  }

  private _createOptions(
    selections: string[] = []
  ): Observable<ComboBoxOption<string>[]> {
    return this.dataAccessor.fetch().pipe(
      map((groups) => {
        const nonExistingGroups = groups.filter(
          (g) => !this.existingGroupIds.includes(g.roleId)
        );
        return nonExistingGroups.map((group) => {
          return {
            key: group.roleId,
            value: group.roleId,
            label: group.roleName,
            disabled: selections.includes(group.roleId),
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
    const values = (this.control.value as string[]).map((groupId) =>
      this._groups.get(groupId)
    );
    this.modalRef.close(values);
  }

  deleteHandler(index: number): void {
    this.control.removeAt(index);

    if (!this.control.length) {
      this.addControl();
    }
  }

  onSelect(val: string, i:number) {
    this.values.splice(i, 1, val)
    // this.values.push(val);
    this.control.setValue(this.values);
  }
}
