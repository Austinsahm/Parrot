import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyLocationNewComponent } from "../company-location-new/company-location-new.component";
import { CompanyLocationDetailComponent } from "../company-location-detail/company-location-detail.component";
import { concatMap, map, tap } from "rxjs/operators";
import { CompanyDetailDataAccessService } from "src/app/data-access/company-detail-data-access.service";
import {
  CompanyDetail,
  CompanyForm,
  CompanyFormData,
  CompanyInformation,
  CompanyLocation,
  CompanyUser,
} from "src/app/data-access/models/company.model";
import { Observable, of } from "rxjs";
import { CompanyContactCreateModalComponent } from "../company-contact-create-modal/company-contact-create-modal.component";
import { CompanyContactUpdateModalComponent } from "../company-contact-update-modal/company-contact-update-modal.component";
import { CompanyService } from "../company.service";
import { StatusCode } from "src/app/data-access/models/http.model";
import { ToastrService } from "ngx-toastr";
import { UserInfoService } from "src/app/services/user-info.service";
import { CompanyDataAccessService } from "src/app/data-access/company-data-access.service";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-company-detail",
  templateUrl: "./company-detail.component.html",
  styleUrls: ["./company-detail.component.scss"],
})
export class CompanyDetailComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  companyDetailsForm: FormGroup;
  editMode: boolean;
  company$: Observable<CompanyDetail>;
  company: CompanyDetail;
  locationDelete = [];
  userDelete = [];
  locationAdd = [];
  userAdd = [];
  newRecord = "new-record-01";

  parentCompany: string;
  companyUrl: string;
  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private readonly ref: ChangeDetectorRef,
    private readonly companyDetailAccessor: CompanyDetailDataAccessService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private toastService: ToastrService,
    private readonly companyDataAccessor: CompanyDataAccessService,
    private userInfoService: UserInfoService,
    private sessionService: SessionStorageService,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();

    this.editMode = false;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

    this.companyDetailsForm = this.formBuilder.group({
      companyName:  ["", [Validators.required]],
      companyDesc: [""],
      companyAddress1: ["", [Validators.required]],
      timeZone: ["", [Validators.required]],
      companyAlias: ["", [Validators.required]],
      statusId: ["", [Validators.required]],
      adminPryPhoneNo: ["", Validators.required],
      adminAltPhoneNo: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.ref.detectChanges();

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((data) => {
        this.parentCompany = data.parentCompany;
      });

    this.company$ = this.route.paramMap
      .pipe(
        concatMap((params) =>
          this.companyDetailAccessor.getAccessor(params.get("id")).get()
        )
      )
      .pipe(
        tap((detail) => {          
          this.company = detail;
          this.companyUrl=`${detail.type.companyUrl}`
          this._updateForm(detail.type);
        })
      );
  }

  /**
   * Updates form with given company information
   */
  private _updateForm(company: CompanyInformation): void {
    this.companyDetailsForm.patchValue({
      companyName: company?.companyName,
      companyDesc: company?.companyDesc,
      companyAddress1: company?.companyAddress,
      timeZone: company?.timeZone,
      companyAlias: company?.subdomaIn,
      statusId: company?.statusId,
      adminPryPhoneNo: this.company.companyUser[0]?.adminPryPhoneNo,
      adminAltPhoneNo: this.company.companyUser[0]?.adminAltPhoneNo,
    });
  }

  edit() {
    this.editMode = true;
  }

  onCancel() {
    this.router.navigate(["../../company-list"], { relativeTo: this.route });
  }

  onSubmit() {
    let companyFormData: CompanyFormData = <CompanyFormData>{};

    companyFormData = this.companyDetailsForm.value;
    companyFormData.companyId = this.company.type.companyId;
    companyFormData.userAdd = this.userAdd;
    companyFormData.locationAdd = this.locationAdd;
    companyFormData.userDelete = this.userDelete;
    companyFormData.locationDelete = this.locationDelete;

    let companyData = {
      userCompanyId: this.userInfoService.getUserInfo().userCompanyId,
      userId: this.userInfoService.getUserInfo().userId,
      ...companyFormData,
    };

    this.companyService.updateCompany(companyData).subscribe(
      (res) => {
        if (res.statusCode === StatusCode.OK) {
          this.companyDetailAccessor.destroyAccessor();
          this.toastService.success("Update successful", "Update Company");
          this.router.navigate(["../../company-list"], {
            relativeTo: this.route,
          });
        } else {
          this.toastService.error("Error while updating..", "");
        }
      },
      (error) => {
        if (!error.status)
          this.toastService.error(
            "You can't make the request, You are offline",
            ""
          );
        else this.toastService.error("Unknown errors", "");
      }
    );
  }

  addBranchOrLocation() {
    const modalRef = this.modal.open(CompanyLocationNewComponent);
    (modalRef.componentInstance as CompanyLocationNewComponent).companyName =
      this.company.type.companyName;
    (modalRef.componentInstance as CompanyLocationNewComponent).duplicateNames =
      (this.company?.companyLocation || []).map(
        (location) => location.locationName
      );

    modalRef.result.then(
      (location: CompanyLocation) => {
        if (!location) {
          return;
        }

        const company = Object.assign({}, this.company);
        // location.locationAddress = location.locationAddress1;
        company.companyLocation = [...company.companyLocation, location];

        this.company$ = of(company).pipe(
          tap((details) => (this.company = details))
        );

        this.locationAdd.push(location);
      },
      () => {}
    );
  }

  locationDeleteHandler(location: CompanyLocation): void {
    const company = Object.assign({}, this.company);

    company.companyLocation = company.companyLocation.filter((curLocation) => {
      return curLocation.locationId !== location.locationId;
    });

    this.company$ = of(company).pipe(
      tap((details) => (this.company = details))
    );

    let locationIndex = this.locationAdd.indexOf(location);

    if (locationIndex == -1) {
      this.locationDelete.push({
        locationId: location.locationId,
      });
    } else {
      if (location.locationId != this.newRecord) {
        this.locationDelete.push({
          locationId: location.locationId,
        });
      }

      this.locationAdd.splice(locationIndex, 1);
    }
  }

  contactDeleteHandler(contact: CompanyUser): void {
    const company = Object.assign({}, this.company);

    company.companyUser = company.companyUser.filter((curUser) => {
      return curUser.userId !== contact.userId;
    });

    this.company$ = of(company).pipe(
      tap((details) => (this.company = details))
    );

    let contactIndex = this.userAdd.indexOf(contact);

    if (contactIndex == -1) {
      this.userDelete.push({
        userId: contact.userId,
      });
    } else {
      if (contact.userId != this.newRecord) {
        this.locationDelete.push({
          userId: contact.userId,
        });
      }

      this.userAdd.splice(contactIndex, 1);
    }
  }

  addContact(): void {
    const modalRef = this.modal.open(CompanyContactCreateModalComponent, {
      centered: true,
      scrollable: true,
    });
    (
      modalRef.componentInstance as CompanyContactCreateModalComponent
    ).subdomain = this.company.type.companyId;
    (
      modalRef.componentInstance as CompanyContactCreateModalComponent
    ).duplicateEmails = this.company.companyUser.map(
      (user) => user.emailAddress
    );

    modalRef.result.then(
      (contact: CompanyUser) => {
        const company = Object.assign({}, this.company);
        company.companyUser = [...company.companyUser, contact];

        this.company$ = of(company).pipe(
          tap((details) => (this.company = details))
        );

        this.userAdd.push(contact);
      },
      () => {}
    );
  }

  viewContact(contact: CompanyUser): void {
    const modalRef = this.modal.open(CompanyContactUpdateModalComponent);
    (modalRef.componentInstance as CompanyContactUpdateModalComponent).contact =
      of(contact);
    (
      modalRef.componentInstance as CompanyContactUpdateModalComponent
    ).subdomain = this.company.type.companyId;

    modalRef.result.then(
      (contact: CompanyUser) => {
        const company = Object.assign({}, this.company);

        let contactIndex = company.companyUser.findIndex(
          (value, index) => value.userId == contact.userId
        );

        company.companyUser.splice(contactIndex, 1, contact);

        this.company$ = of(company).pipe(
          tap((details) => {
            this.company = details;
            this.ref.detectChanges();
          })
        );

        this.userAdd.push(contact);
      },
      () => {}
    );
  }

  viewBranchOrLocation(branch: CompanyLocation) {
    const modalRef = this.modal.open(CompanyLocationDetailComponent);
    (modalRef.componentInstance as CompanyLocationDetailComponent).locationId =
      branch.locationId;
    (modalRef.componentInstance as CompanyLocationDetailComponent).location =
      of({ company: this.company.type, branch });

    modalRef.result.then(
      (location: CompanyLocation) => {
        const company = Object.assign({}, this.company);

        let locationIndex = company.companyLocation.findIndex(
          (value, index) => value.locationId == branch.locationId
        );

        company.companyLocation.splice(locationIndex, 1, location);

        this.company$ = of(company).pipe(
          tap((details) => {
            this.company = details;
            this.ref.detectChanges();
          })
        );

        this.locationAdd.push(location);
      },
      () => {}
    );
  }
}
