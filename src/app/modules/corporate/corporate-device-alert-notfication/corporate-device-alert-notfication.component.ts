import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import { CorporateEventMonitoringHttpService } from "src/app/data-access/http/corporate-event-monitoring-http.service";
import {
  NotificationAlert,
  NotificationAlertDataForm,
  NotificationAlertResponse,
  UserAlert,
} from "src/app/data-access/models/alert-notification.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { AddUserAlertModalComponent } from "src/app/widgets/common-company-asset/add-user-alert-modal/add-user-alert-modal.component";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";

@Component({
  selector: "app-corporate-device-alert-notfication",
  templateUrl: "./corporate-device-alert-notfication.component.html",
  styleUrls: ["./corporate-device-alert-notfication.component.scss"],
})
export class CorporateDeviceAlertNotficationComponent implements OnInit {
  editMode: boolean = false;
  subdomain: string;
  companyName: string;
  category: UserAlert;
  notifyForm: FormGroup;
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  users$: Observable<{ users: UserAlert[]; alert: NotificationAlert }>;
  _user: { users: UserAlert[]; alert: NotificationAlert };

  permission$: Observable<CorporatePermissionCategory>;

  addUser: { userId: string }[] = [];
  delUser: { userId: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private toastService: ToastrService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly alertService: CorporateEventMonitoringHttpService,
    private readonly sessionService: SessionStorageService,
    private readonly cd: ChangeDetectorRef,
    private userStore: UsersStoreService
  ) {
    this.notifyForm = this.formBuilder.group({
      companyName: [""],
      sms: [""],
      email: [""],
      phone: [""],
    });
    this.permission$ = this.sessionService.readPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.companyName = this.companyInfoService.getCompanyInfo().companyName;

    this.loadData();
  }

  loadData(reload?:boolean) {
    this.userStore.listCompanyUserNotification(this.subdomain,reload);

    this.users$ = this.userStore.notifyUser$.pipe(
      mergeMap((users) => {
        return this.userStore.alertMethod$.pipe(
          map(({ sms, email, phone }) => {
            this.notifyForm.patchValue({
              sms,
              phone,
              email,
            });
            return (this._user = { users, alert: { sms, phone, email } });
          })
        );
      })
    );

    // this.users$ = this.alertService.listUsersAlert(this.subdomain).pipe(
    //   mergeMap((users) => {
    //     return this.alertService.alertnotification(this.subdomain).pipe(
    //       map((alert) => {
    //         this.notifyForm.patchValue({
    //           sms:
    //             alert[0].sms === "1" ||
    //             alert[0].sms === NotificationAlertResponse.Y
    //               ? true
    //               : false,
    //           email:
    //             alert[0].email === "1" ||
    //             alert[0].email === NotificationAlertResponse.Y
    //               ? true
    //               : false,
    //           phone:
    //             alert[0].phone === "1" ||
    //             alert[0].phone === NotificationAlertResponse.Y
    //               ? true
    //               : false,
    //         });
    //         return (this._user = { users, alert });
    //       })
    //     );
    //   })
    // );
  }

  edit() {
    this.editMode = true;
    this.notifyForm.patchValue({ companyName: this.companyName });
  }

  addAlertUser() {
    const modalRef = this.modal.open(AddUserAlertModalComponent, {
      size: "lg",
    });
    (modalRef.componentInstance as AddUserAlertModalComponent).subdomain =
      this.subdomain;
    (modalRef.componentInstance as AddUserAlertModalComponent).category =
      this.category;
    (modalRef.componentInstance as AddUserAlertModalComponent).existingUsersId =
      this._user.users.map((u) => u.userId);
    modalRef.result.then(
      (alerts: UserAlert[]) => {
        if (!alerts?.length) return;
        this.users$ = of({
          users: [...alerts, ...this._user.users],
          alert: this._user.alert,
        }).pipe(
          tap((user) => {
            this._user = user;
          })
        );
        this.addUser.push(
          ...alerts.map(({ userId }) => <{ userId: string }>{ userId })
          // ...alerts.map(
          //   ({
          //     altPhoneNo,
          //     emailAddress,
          //     firstName,
          //     lastName,
          //     pryPhoneNo,
          //     userId,
          //   }) => ({
          //     altPhoneNo,
          //     emailAddress,
          //     firstName,
          //     lastName,
          //     pryPhoneNo,
          //     userId,
          //   })
          // )
        );
      },
      () => {}
    );
  }

  deleteHandler(user: UserAlert) {
    const users = this._user.users.filter((u) => u.userId !== user.userId);
    this.users$ = of({ users, alert: this._user.alert }).pipe(
      tap((user) => (this._user = user))
    );
    let userIndex = this.addUser.findIndex((u) => u.userId === user.userId);
    if (userIndex === -1) {
      this.delUser.push({ userId: user.userId });
    } else {
      this.addUser.splice(userIndex, 1);
    }
  }

  submit() {
    let formData: NotificationAlertDataForm = {
      ...this.notifyForm.value,
      addUser: this.addUser,
      delUser: this.delUser,
      companyId: this.subdomain,
    };

    delete formData.companyName;

    this.userStore.updateNotificationUserMethod(formData);

    this.editMode = false;

    //reset the form elarray
    this.delUser = [];
    this.addUser = [];

    this.loadData(true);

    // this.alertService
    //   .updateNotification(formData)
    //   // .pipe(
    //   //   this.toastr.observe({
    //   //     loading: "Updating, please wait...",
    //   //     success: "Record updated successfully.",
    //   //     error: "Error updating information.",
    //   //   })
    //   // )
    //   .subscribe(
    //     (res) => {
    //       if (res?.status === "SUCCESS") {
            // this.toastService.success(
            //   "Alert Notification Updated successful",
            //   "Alert Notification"
            // );
    //         this.editMode = false;
    //         this.cd.markForCheck();
    //       } else {
    //         this.toastService.error("Error while updating", "");
    //       }
    //     },
    //     (error) => {
    //       if (!error.status)
    //         this.toastService.error("You might be offline", "Request Failed");
    //       else this.toastService.error("Unknown Error", "");
    //     }
    //   );
  }

  cancel() {
    this.editMode = false;
    this.loadData();
  }
}
