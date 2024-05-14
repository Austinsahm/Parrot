import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import {
  ChartTypeEnum,
  DashboardForm,
  MarkerIcon,
  StaticChartTypeImg,
  TimeChartTypeImg,
  VisualizationTypes,
} from "src/app/data-access/models/dashboard.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
// import { StatusCode } from 'src/app/data-access/models/http.model';

@Component({
  selector: "app-corporate-dashboard-new",
  templateUrl: "./corporate-dashboard-new.component.html",
  styleUrls: ["./corporate-dashboard-new.component.scss"],
})
export class CorporateDashboardNewComponent implements OnInit {
  dashboardView = false;
  geolocationView = false;

  dashboardForm: FormGroup;

  subdomain: string;

  showStaticChartImg = false;
  staticChartImg: string;

  showTimeChartImg = false;
  timeChartImg: string;

  showMarkerIcon = false;
  markerIcon: string;
  markerIcons: MarkerIcon[];
  formColor: string;
  formBgColor: string;
  formFont: string;

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
    private cd: ChangeDetectorRef
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.dashboardForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      deviceId: ["", [Validators.required]],
      visualization: ["", [Validators.required]],
      owner: ["", [Validators.required]],
    });

    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.dashboardService.fetchMarkerIcon().subscribe(
      (data) => (this.markerIcons = data),
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
      dashBoardId: "new-record",
      dashBoardName: formData.name,
      deviceId: formData.deviceId,
      dashBoardType: formData.visualization,
      dashBoardOwner: "owner",
      createdBy: "admin",
      statChartTypeId: formData.dashboardModel.staticChart,
      timeChartTypeId: formData.dashboardModel.timeChart,
    };

    this.dashboardService.saveDashboard(dashboardform).subscribe(
      (res) => {
        // if (res.statusCode === StatusCode.OK) {
        this.toastService.success(
          "Created dashboard successful",
          "Create Dashboard"
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

  staticChartChange(event) {
    let chartType =
      event.target.options[event.target.options.selectedIndex].text;

    switch (chartType) {
      case ChartTypeEnum.PIE:
        this.staticChartImg = StaticChartTypeImg.PIE;
        this.showStaticChartImg = true;
        break;
      case ChartTypeEnum.DOUGHNUT:
        this.staticChartImg = StaticChartTypeImg.DOUGHNUT;
        this.showStaticChartImg = true;
        break;
      case ChartTypeEnum.GAUGE:
        this.staticChartImg = StaticChartTypeImg.GAUGE;
        this.showStaticChartImg = true;
        break;

      default:
        this.showStaticChartImg = false;
        break;
    }
  }

  timeChartChange(event) {
    let chartType =
      event.target.options[event.target.options.selectedIndex].text;

    switch (chartType) {
      case ChartTypeEnum.LINE:
        this.timeChartImg = TimeChartTypeImg.LINE;
        this.showTimeChartImg = true;
        break;
      case ChartTypeEnum.BAR:
        this.timeChartImg = TimeChartTypeImg.BAR;
        this.showTimeChartImg = true;
        break;

      default:
        this.showTimeChartImg = false;
        break;
    }
  }

  markerIconChange(event) {
    let markerType =
      event.target.options[event.target.options.selectedIndex].text;

    let pickedMarkerIcon = this.markerIcons.filter(
      (value) => value.iconName == markerType
    )[0];

    if (pickedMarkerIcon) {
      this.markerIcon = pickedMarkerIcon.iconImage;
      this.showMarkerIcon = true;
    }
  }
}
