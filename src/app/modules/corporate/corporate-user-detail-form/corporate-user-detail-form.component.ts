import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CompanyUser,
  CompanyUserFormData,
} from "src/app/data-access/models/company.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { UserGroup } from "src/app/data-access/models/group.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { UserGroupModalComponent } from "../user-group-modal/user-group-modal.component";

@Component({
  selector: "app-corporate-user-detail-form",
  templateUrl: "./corporate-user-detail-form.component.html",
  styleUrls: ["./corporate-user-detail-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateUserDetailFormComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  @Output() onSave: EventEmitter<CompanyUserFormData>;
  @Output() onCancel: EventEmitter<void>;
  @Output() onGroupChanged: EventEmitter<UserGroup[]>;

  @Input() set user(value: CompanyUser) {
    this.form.patchValue(value || {});
  }

  @Input() groups: UserGroup[] = [];
  @Input() company: Domain;

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modal: NgbModal,
    private userInfoService: UserInfoService,
    private readonly companyInfoService: CompanyInfoService
  ) {
    this.onSave = new EventEmitter<CompanyUserFormData>();
    this.onCancel = new EventEmitter<void>();
    this.onGroupChanged = new EventEmitter<UserGroup[]>();

    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.form = this.fb.group({
      firstName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required])],
      locationId: ["", Validators.compose([Validators.required])],
      userTypeId: ["", Validators.compose([Validators.required])],
      statusId: ["", Validators.compose([Validators.required])],
      companyId: userInfoService.getUserInfo().userCompanyId,
      createdBy: "admin",
      emailAddress: [
        "",
        Validators.compose([Validators.required, Validators.email]),
      ],
      pryPhoneNo: ["", Validators.compose([Validators.required])],
      altPhoneNo: [""],
    });
  }

  ngOnInit(): void {}

  onLocationChange(e) {
    this.form.patchValue({ locationId: e.value });
  }

  onUserTypeChange(e) {
    this.form.patchValue({ userTypeId: e.value });
  }

  saveHandler(): void {
    // if (this.form.invalid || this.form.pristine) {
    //   return;
    // }
    this.onSave.emit(this.form.value);
  }

  addToGroup(): void {
    const modalRef = this.modal.open(UserGroupModalComponent);
    (modalRef.componentInstance as UserGroupModalComponent).existingGroupIds =
      this.groups.map((g) => g.roleId);

    modalRef.result.then(
      (groups: UserGroup[]) => {
        if (!groups?.length) {
          return;
        }
        this.onGroupChanged.emit([...groups]);
      },
      () => {}
    );
  }

  deleteHandler(group: UserGroup): void {
    this.onGroupChanged.emit(
      this.groups.filter((g) => g.roleId !== group.roleId)
    );
  }
}
