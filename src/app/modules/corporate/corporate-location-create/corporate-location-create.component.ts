import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { concatMap, tap } from "rxjs/operators";
import { CompanyBranchDataAccessService } from "src/app/data-access/company-branch-data-access.service";
import { LocationHttpServiceService } from "src/app/data-access/http/location-http-service.service";
import { LocationDataAccessService } from "src/app/data-access/location-data-access.service";
import { StatusCode } from "src/app/data-access/models/http.model";
import { LocationFormData } from "src/app/data-access/models/location.model";
import { CompanyInfoResolverService } from "src/app/services/company-info-resolver.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { Observable, of } from "rxjs";
import { CompanyBranch } from "src/app/data-access/models/company.model";

@Component({
  selector: "app-corporate-location-create",
  templateUrl: "./corporate-location-create.component.html",
  styleUrls: ["./corporate-location-create.component.scss"],
})
export class CorporateLocationCreateComponent implements OnInit {
  @Input() editable = true;
  form: FormGroup;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  saveLocation$: Observable<CompanyBranch[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private locationService: LocationHttpServiceService,
    private toastService: ToastrService,
    private locationDataService: LocationDataAccessService,
    private companyInfoService: CompanyInfoService,
    private readonly branchDataAccessor: CompanyBranchDataAccessService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.form = this.formBuilder.group({
      createdBy: "admin",
      locationName: ["", [Validators.required]],
      locationDesc: ["", [Validators.required]],
      locAddress1: ["", [Validators.required]],
      locAddress2: ["", [Validators.required]],
      postalCode: [""],
      stateId: ["", [Validators.required]],
      cityId: ["", [Validators.required]],
      statusId: ["", [Validators.required]],
      companyId: userInfoService.getUserInfo().userCompanyId,
    });
  }

  ngOnInit(): void {}

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

    this.saveLocation$ = this.locationService.create([locationForm]).pipe(
      concatMap((res) => {
        if (res.status === StatusCode.SUCCESS) {
          this.locationDataService.destroyAccessor(
            this.userInfoService.getUserInfo().userCompanyId
          );
          this.toastService.success(
            "Created Location successful",
            "Create Location"
          );
          return this.branchDataAccessor
            .getAccessor(this.userInfoService.getUserInfo().userCompanyId)
            .fetch(true)
            .pipe(
              tap(() => {
                this.router.navigate(["../location"], {
                  relativeTo: this.route.parent,
                });
              })
            );
        } else {
          this.toastService.error("Error while creating", "");
          return this.branchDataAccessor
            .getAccessor(this.userInfoService.getUserInfo().userCompanyId)
            .fetch()
            .pipe(
              tap(() => {
                this.router.navigate(["../location"], {
                  relativeTo: this.route.parent,
                });
              })
            );
        }
      })
    );
  }

  closeHandler() {
    this.router.navigate(["../location"], { relativeTo: this.route.parent });
  }
}
