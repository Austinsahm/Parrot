import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import {
  CompanyParametersDataForm,
  CompanyViewDirctory,
  NotificationAlertResponse,
} from "src/app/data-access/models/alert-notification.model";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { Observable, Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CorporateEventMonitoringHttpService } from "src/app/data-access/http/corporate-event-monitoring-http.service";
import { ToastrService } from "ngx-toastr";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-partner-company-parameters",
  templateUrl: "./partner-company-parameters.component.html",
  styleUrls: ["./partner-company-parameters.component.scss"],
})
export class PartnerCompanyParametersComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  subdomain: string;
  companyName: string;
  notifyForm: FormGroup;
  formColor: string;
  formBgColor: string;
  formFont: string;
  formFontColor: string;
  coyDirectory: CompanyViewDirctory;
  primaryColour: string;

  viewList: ComboBoxOption<string>[];
  permission$: Observable<PartnerPermissionCategory>;

  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private readonly sessionService: SessionStorageService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly alertService: CorporateEventMonitoringHttpService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private userStore: UsersStoreService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.viewList = [
      {
        key: "ORGANOGRAM_HOR",
        value: "ORGANOGRAM_HOR",
        label: "Horizontal Organogram",
      },
      {
        key: "ORGANOGRAM_VTC",
        value: "ORGANOGRAM_VTC",
        label: "Vertical Organogram",
      },
      {
        key: "TABULAR",
        value: "TABULAR",
        label: "Table Format",
      },
    ];
  }

  defSelection: string;
  defaultOption: ComboBoxOption<string>;

  ngOnInit(): void {
    this.loadParams();
  }

  loadParams() {
    this.subscription = this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this.companyName = param.get("companyName");
        this.subdomain = param.get("subdomain");
        // this.alertService
        //     .getCompanyParameters(this.subdomain)
        //     .subscribe((data) => {
        //       this.notifyForm.patchValue({
        //         sms:
        //           data[0]?.sms === "1" ||
        //             data[0]?.sms === NotificationAlertResponse.Y
        //             ? true
        //             : false,
        //         email:
        //           data[0]?.email === "1" ||
        //             data[0]?.email === NotificationAlertResponse.Y
        //             ? true
        //             : false,
        //         phone:
        //           data[0]?.phone === "1" ||
        //             data[0]?.phone === NotificationAlertResponse.Y
        //             ? true
        //             : false,
        //         message_rep_def_days: data[0]?.message_rep_def_days,
        //         company_rep_day: data[0]?.company_rep_day,
        //         billing_rep_day: data[0]?.billing_rep_day,
        //         dashbd_def_days: data[0]?.dashbd_def_days,
        //         device_rep_def_days: data[0]?.device_rep_def_days,
        // coyDirectory: data[0]?.coyDirectory,
        //       });
        //     });

        this.notifyForm = this.formBuilder.group({
          companyName: [""],
          companyId: [this.subdomain],
          device_rep_def_days: [""],
          sms: [""],
          email: [""],
          phone: [""],
          message_rep_def_days: [""],
          company_rep_day: [""],
          billing_rep_day: [""],
          dashbd_def_days: [""],
          coyDirectory: [""],
        });

        this.userStore.getCompanyParameter(this.subdomain, true);

        this.userStore.companyParameter$.subscribe(
          (data) => {
            this.defSelection = data.coyDirectory;
            this.defaultOption = this.viewList.find(
              (el) => el.key === this.defSelection
            );
            
            this.notifyForm.patchValue({
              sms: data.sms,
              email: data.email,
              phone: data.phone,
              message_rep_def_days: data.message_rep_def_days,
              company_rep_day: data.company_rep_day,
              billing_rep_day: data.billing_rep_day,
              dashbd_def_days: data.dashbd_def_days,
              device_rep_def_days: data.device_rep_def_days,
              coyDirectory: this.defaultOption?.label || this.viewList[2].label,
            });
          },
          () => {}
        );
      },
      () => {}
    );
  }

  edit() {
    this.editMode = true;
    this.notifyForm.patchValue({ companyName: this.companyName });
  }

  cancel() {
    this.editMode = false;
  }

  viewMode(e) {
    this.coyDirectory = e.value;
  }

  update() {
    delete this.notifyForm.value.companyName;

    const formData: CompanyParametersDataForm = {
      ...this.notifyForm.value,
      coyDirectory: this.coyDirectory ?? this.defSelection,
    };

    this.subscription = this.userStore
      .updateCompanyParameter(formData, true)
      .pipe(
        map((data) => {
          if (data.length) {
            this.toastService.success("Company Parameter Updated", "");
            this.editMode = false;
          } else {
            this.toastService.error("Error while updating", "");
          }
        })
      )
      .subscribe({ error: () => {} });

    // this.alertService
    //   .updateCompanyParameter(formData)
    //   // .pipe(
    //   //   this.toastService.observe({
    //   //     loading: "Updating, please wait...",
    //   //     success: "Record updated successfully.",
    //   //     error: "Error updating information.",
    //   //   })
    //   // )
    //   .subscribe((data) => {
    //     if (data?.status === "SUCCESS") {
    //       this.toastService.success("Company Parameter Updated", "");
    //       this.editMode = false;
    //       this.loadParams()
    //       this.cd.markForCheck();
    //     } else {
    //       this.toastService.error("Error while updating", "");
    //     }
    //   },
    //     (error) => {
    //       if (!error.status)
    //         this.toastService.error(
    //           "You can't make the request, You are offline",
    //           ""
    //         );
    //       else this.toastService.error("Unknown errors", "");
    //     });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
