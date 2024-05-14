import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import {
  DashboardDirectory,
  DashboardForm,
  SpecificDashboard,
  VisualizationTypes,
} from "src/app/data-access/models/dashboard.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
// import { StatusCode } from 'src/app/data-access/models/http.model';
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-corporate-dashboard-update",
  templateUrl: "./corporate-dashboard-update.component.html",
  styleUrls: ["./corporate-dashboard-update.component.scss"],
})
export class CorporateDashboardUpdateComponent implements OnInit {
  dashboardView = false;
  geolocationView = false;

  dashboardForm: FormGroup;

  subdomain: string;
  fromCateg: string;
  formColor: string;
  formBgColor: string;
  formFont: string;

  dashboardEntry: DashboardDirectory;

  dashboardResult: SpecificDashboard;

  permission$: Observable<CorporatePermissionCategory>;

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private userInfoService: UserInfoService,
    private toastService: ToastrService,
    // private readonly deviceDataAccessor: DeviceDataAccessService,
    // private deviceService: DeviceService,
    private dashboardService: DashboardHttpService,
    private readonly route: ActivatedRoute,
    private sessionService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.permission$ = this.sessionService.readPermission();

    this.dashboardForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      deviceId: ["", [Validators.required]],
      visualization: ["", [Validators.required]],
      owner: ["", [Validators.required]],
      dashboardId: ["new-record", [Validators.required]],
    });

    this.route.params.subscribe(
      (value) => {
        const dashboardId = value.dashboardId;

        this.dashboardService.specificDashboard(dashboardId).subscribe(
          (res) => {
            this.dashboardForm.patchValue({
              name: res.dashboardName,
              deviceId: res.deviceId,
              visualization: res.dashboardType.toLowerCase(),
              owner: res.dashboardOwner,
              dashboardId: dashboardId,
            });

            this.toggleVisualizationForm();

            this.dashboardForm.get("dashboardModel").patchValue({
              staticChart: res.statChartTypeId,
              timeChart: res.timeChartTypeId,
            });

            this.dashboardResult = res;
          },
          () => {}
        );

        this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }

  cancel() {
    this.router.navigate(["../dashboard"], { relativeTo: this.route.parent });
  }

  toggleVisualizationForm() {
    this.dashboardView =
      this.dashboardForm.get("visualization").value ==
      VisualizationTypes.dashboard
        ? true
        : false;

    this.geolocationView =
      this.dashboardForm.get("visualization").value ==
      VisualizationTypes.geolocation
        ? true
        : false;

    if (
      this.dashboardForm.get("visualization").value ==
      VisualizationTypes.dashboard
    ) {
      this.dashboardForm.addControl(
        "dashboardModel",
        this.formBuilder.group({
          staticChart: ["", [Validators.required]],
          timeChart: ["", [Validators.required]],
        })
      );

      this.dashboardForm.removeControl("geolocationModel");
    } else if (
      this.dashboardForm.get("visualization").value ==
      VisualizationTypes.geolocation
    ) {
      this.dashboardForm.addControl(
        "geolocationModel",
        this.formBuilder.group({
          markerIcon: ["", [Validators.required]],
          speed: ["", [Validators.required]],
        })
      );

      this.dashboardForm.removeControl("dashboardModel");
    }
  }

  submit() {
    let formData = this.dashboardForm.value;

    let dashboardform: DashboardForm = {
      dashBoardId: formData.dashboardId,
      dashBoardName: formData.name,
      deviceId: formData.deviceId,
      dashBoardType: formData.visualization,
      dashBoardOwner: "owner",
      createdBy: "admin",
      statChartTypeId: formData.dashboardModel.staticChart,
      timeChartTypeId: formData.dashboardModel.timeChart,
    };

    this.dashboardService.updateDashboard(dashboardform).subscribe(
      (res) => {
        // if (res.statusCode === StatusCode.OK) {
        this.toastService.success(
          "Update dashboard successful",
          "Update Dashboard"
        );
        this.router.navigate(["../dashboard"], {
          relativeTo: this.route.parent,
        });
        // } else {
        //   this.toastService.error('Error while creating', '');
        // }
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }
}
