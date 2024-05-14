import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { CompanyBranchDataAccessService } from "src/app/data-access/company-branch-data-access.service";
import { LocationHttpServiceService } from "src/app/data-access/http/location-http-service.service";
import { LocationDataAccessService } from "src/app/data-access/location-data-access.service";
import { CompanyBranch } from "src/app/data-access/models/company.model";
import { LocationDevice } from "src/app/data-access/models/device.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import {
  CorporateLocation,
  LocationFormData,
} from "src/app/data-access/models/location.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-corporate-location-detail",
  templateUrl: "./corporate-location-detail.component.html",
  styleUrls: ["./corporate-location-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateLocationDetailComponent implements OnInit {
  editable = false;

  form: FormGroup;

  locationId: string;

  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  devices$: Observable<LocationDevice[]>;

  source$: Observable<CorporateLocation[]>;

  details: CorporateLocation;
  permission$: Observable<CorporatePermissionCategory>;
  editLocation$: Observable<CompanyBranch[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private locationService: LocationHttpServiceService,
    private locationDataService: LocationDataAccessService,
    private toastService: ToastrService,
    private sessionService: SessionStorageService,
    private companyInfoService: CompanyInfoService,
    private readonly branchDataAccessor: CompanyBranchDataAccessService
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.form = this.formBuilder.group({
      createdBy: "admin",
      locationId: "",
      locationName: ["", [Validators.required]],
      locationDesc: ["", [Validators.required]],
      locAddress1: ["", [Validators.required]],
      locAddress2: ["", [Validators.required]],
      postalCode: [""],
      stateId: ["", [Validators.required]],
      cityId: ["", [Validators.required]],
      statusId: ["", [Validators.required]],
      companyId: this.userInfoService.getUserInfo().userCompanyId,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param) => (this.locationId = param.get("locationId"))
    );

    this.devices$ = this.locationService.locationDevices(this.locationId);

    this.source$ = this.locationService
      .getLocation(
        this.locationId,
        this.userInfoService.getUserInfo().userCompanyId
      )
      .pipe(
        map((data) => {
          this.updateForm(data[0]);
          this.details = data[0];
          return data;
        })
      );

    this.source$.pipe(
      map((data) => {
        this.form.patchValue({ cityId: data[0].cityId });
      })
    );
  }

  ngAfterContentInit() {
    // this.source$.pipe(
    //   map((data) => {
    //     this.form.patchValue({ cityId: data[0].cityId });
    //   })
    // );
    // this.source$.subscribe((data) =>
    //   this.form.patchValue({
    //     cityId: data[0].cityId,
    //   })
    // );
  }

  updateForm(data: CorporateLocation) {
    this.form.patchValue({
      locationId: this.locationId,
      locationName: data.locationName,
      locationDesc: data.locationDesc,
      locAddress1: data.locationAddress1,
      locAddress2: data.locationAddress2,
      postalCode: "",
      stateId: data.stateId,
      cityId: data.cityId,
      statusId: data.statusId,
    });
  }

  changeState(e) {
    this.form.patchValue({ stateId: e.value });
  }

  changeCity(e) {
    this.form.patchValue({ cityId: e.value });
  }

  changeStatus(e) {
    this.form.patchValue({ statusId: e.value });
  }

  saveHandler() {
    let locationForm: LocationFormData = { ...this.form.value };

    this.editLocation$ = this.locationService.update([locationForm]).pipe(
      concatMap((res) => {
        if (res.status === StatusCode.SUCCESS) {
          this.locationDataService.destroyAccessor(
            this.userInfoService.getUserInfo().userCompanyId
          );
          this.toastService.success(
            "Updated Location successful",
            "Update Location"
          );
          return this.branchDataAccessor
            .getAccessor(this.userInfoService.getUserInfo().userCompanyId)
            .fetch(true)
            .pipe(
              tap(() => {
                //wait for data before navigating
                this.router.navigate(["../location"], {
                  relativeTo: this.route.parent,
                });
              })
            );
        } else {
          this.toastService.error("Error while updating", "");
          return this.branchDataAccessor
            .getAccessor(this.userInfoService.getUserInfo().userCompanyId)
            .fetch()
            .pipe(
              tap(() => {
                //wait for data before navigating
                this.router.navigate(["../location"], {
                  relativeTo: this.route.parent,
                });
              })
            );
        }
      })
    );
    // .subscribe({
    //   error: (error) => {
    //     if (!error.status)
    //       this.toastService.error("You might be offline", "Request Failed");
    //     else this.toastService.error("Unknown Error", "");
    //   },
    // });
  }

  closeHandler() {
    if (this.editable) this.editable = !this.editable;
    else
      this.router.navigate(["../location"], { relativeTo: this.route.parent });
  }

  edit() {
    this.editable = true;
  }
}
