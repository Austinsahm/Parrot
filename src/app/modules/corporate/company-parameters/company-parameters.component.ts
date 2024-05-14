import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  CompanyParametersDataForm,
  NotificationAlertResponse,
  UserAlert,
} from "src/app/data-access/models/alert-notification.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyUser } from "src/app/data-access/models/company.model";
import {
  Device,
  DeviceCategory,
} from "src/app/data-access/models/device.model";
import { AddUserAlertModalComponent } from "src/app/widgets/common-company-asset/add-user-alert-modal/add-user-alert-modal.component";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { Observable, Subscription, of } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CorporateEventMonitoringHttpService } from "src/app/data-access/http/corporate-event-monitoring-http.service";
import { ToastrService } from "ngx-toastr";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-company-parameters",
  templateUrl: "./company-parameters.component.html",
  styleUrls: ["./company-parameters.component.scss"],
})
export class CompanyParametersComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  subdomain: string;
  companyName: string;
  category: UserAlert;
  notifyForm: FormGroup;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  users$: Observable<{ users: UserAlert[] }>;
  _user: { users: UserAlert[] };

  permission$: Observable<CorporatePermissionCategory>;

  addUser: { userId: string }[] = [];
  delUser: { userId: string }[] = [];

  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private readonly sessionService: SessionStorageService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly alertService: CorporateEventMonitoringHttpService,
    private readonly cd: ChangeDetectorRef,
    private userStore: UsersStoreService
  ) {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

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
    });
    this.permission$ = this.sessionService.readPermission();

    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {
    this.companyName = this.companyInfoService.getCompanyInfo().companyName;

    this.userStore.getCompanyParameter(this.subdomain);

    this.subscription = this.userStore.companyParameter$.subscribe(
      (data) => {
        this.notifyForm.patchValue({
          sms: data.sms,
          email: data.email,
          phone: data.phone,
          message_rep_def_days: data.message_rep_def_days,
          company_rep_day: data.company_rep_day,
          billing_rep_day: data.billing_rep_day,
          dashbd_def_days: data.dashbd_def_days,
          device_rep_def_days: data.device_rep_def_days,
        });
      },
      () => {}
    );

    // this.alertService.getCompanyParameters(this.subdomain).subscribe(
    //   (data) => {
    // this.notifyForm.patchValue({
    //   sms:
    //     data[0].sms === "1" || data[0].sms === NotificationAlertResponse.Y
    //       ? true
    //       : false,
    //   email:
    //     data[0].email === "1" ||
    //     data[0].email === NotificationAlertResponse.Y
    //       ? true
    //       : false,
    //   phone:
    //     data[0].phone === "1" ||
    //     data[0].phone === NotificationAlertResponse.Y
    //       ? true
    //       : false,
    //   message_rep_def_days: data[0].message_rep_def_days,
    //   company_rep_day: data[0].company_rep_day,
    //   billing_rep_day: data[0].billing_rep_day,
    //   dashbd_def_days: data[0].dashbd_def_days,
    //   device_rep_def_days: data[0].device_rep_def_days,
    // });
    //   },
    //   (error) => {
    //     if (!error.status)
    //       this.toastService.error("You might be offline", "Request Failed");
    //     else this.toastService.error("Unknown Error", "");
    //   }
    // );
  }

  edit() {
    this.editMode = true;
    this.notifyForm.patchValue({ companyName: this.companyName });
  }

  cancel() {
    this.editMode = false;
  }

  update() {
    delete this.notifyForm.value.companyName;

    const formData: CompanyParametersDataForm = { ...this.notifyForm.value };
    this.subscription = this.userStore
      .updateCompanyParameter(formData)
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
    //   .subscribe(
    //     (data) => {
    //       if (data?.status === "SUCCESS") {
    // this.toastService.success("Company Parameter Updated", "");
    //         this.editMode = false;
    //         this.cd.markForCheck();
    //       } else {
    // this.toastService.error("Error while updating", "");
    //       }
    //     },
    //     (error) => {
    //       if (!error.status)
    //         this.toastService.error("You might be offline", "Request Failed");
    //       else this.toastService.error("Unknown Error", "");
    //     }
    //   );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
