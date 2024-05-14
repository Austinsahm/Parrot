import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, of } from "rxjs";
import { filter, map, mergeMap, tap } from "rxjs/operators";
import { CorporateEventMonitoringHttpService } from "../http/corporate-event-monitoring-http.service";
import { DateHttpService } from "../http/date-http.service";
import {
  CompanyParametersDataForm,
  NotificationAlert,
  NotificationAlertDataForm,
  NotificationAlertResponse,
  UserAlert,
} from "../models/alert-notification.model";
import { DefaultDate } from "../models/date.model";
import { CompanyStoreService } from "./company-store.service";

@Injectable({
  providedIn: "root",
})
export class UsersStoreService {
  private notifyUser = new BehaviorSubject<UserAlert[]>([]);
  private alertMethod = new BehaviorSubject<NotificationAlert>(null);
  private companyParameter = new BehaviorSubject<CompanyParametersDataForm>(
    null
  );
  private defaultDate = new BehaviorSubject<DefaultDate>(null);

  notifyUser$ = this.notifyUser.asObservable();
  alertMethod$ = this.alertMethod
    .asObservable()
    .pipe(filter((value) => value && typeof value !== null));
  companyParameter$ = this.companyParameter
    .asObservable()
    .pipe(filter((param) => param && typeof param !== null));
  defaultDate$ = this.defaultDate
    .asObservable()
    .pipe(filter((date) => date && typeof date !== null));

  constructor(
    private corporateEventHttp: CorporateEventMonitoringHttpService,
    private dateService: DateHttpService,
    private companyStore: CompanyStoreService,
    private toastService: ToastrService
  ) {}

  listCompanyUserNotification(subdomain: string, reload: boolean) {
    if (reload || this.notifyUser.getValue().length === 0) {
      this.corporateEventHttp
        .listUsersAlert(subdomain)
        .pipe(
          tap((notifucations) => this.notifyUser.next(notifucations)),
          mergeMap(() =>
            this.corporateEventHttp.alertnotification(subdomain).pipe(
              map((alert) => {
                return {
                  sms:
                    alert[0].sms === "1" ||
                    alert[0].sms === NotificationAlertResponse.Y
                      ? true
                      : false,
                  email:
                    alert[0].email === "1" ||
                    alert[0].email === NotificationAlertResponse.Y
                      ? true
                      : false,
                  phone:
                    alert[0].phone === "1" ||
                    alert[0].phone === NotificationAlertResponse.Y
                      ? true
                      : false,
                };
              }),
              tap((notify) => this.alertMethod.next(notify))
            )
          )
        )
        .subscribe({ error: () => {} });
    }
  }

  updateNotificationUserMethod(notifyForm: NotificationAlertDataForm) {
    const notifyUsers = this.notifyUser.getValue();

    const alertmethod = this.alertMethod.getValue();

    const { sms, email, phone, addUser, delUser } = notifyForm;

    const updateAlertMethod: NotificationAlert = { sms, email, phone };

    //make copy of user before array mutation
    // const updateNotifyUsers = notifyUsers.splice(0);

    // if (delUser.length) {
    //   delUser.map((user, i) => {
    //     const delIndex = updateNotifyUsers.findIndex(
    //       (u) => u.userId === user.userId
    //     );
    //     // updateNotifyUsers.splice(delIndex, 1);
    //   });
    // }

    //update subject with add array
    // updateNotifyUsers.push(...addUser.map((user) => user));

    //uppdate the subject
    this.alertMethod.next(updateAlertMethod);
    // this.notifyUser.next(updateNotifyUsers);

    this.corporateEventHttp.updateNotification(notifyForm).subscribe(
      () =>
        this.toastService.success(
          "Alert Notification Updated successful",
          "Alert Notification"
        ),
      (error) => {
        this.notifyUser.next(notifyUsers);
        this.alertMethod.next(alertmethod);
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      },
      () => {}
    );
  }

  getCompanyParameter(subdomain: string, partner?: boolean) {
    if (partner || this.companyParameter.getValue() === null) {
      this.corporateEventHttp
        .getCompanyParameters(subdomain)
        .pipe(
          map((params) => {
            return {
              sms:
                params[0].sms === "1" ||
                params[0].sms === NotificationAlertResponse.Y
                  ? true
                  : false,
              email:
                params[0].email === "1" ||
                params[0].email === NotificationAlertResponse.Y
                  ? true
                  : false,
              phone:
                params[0].phone === "1" ||
                params[0].phone === NotificationAlertResponse.Y
                  ? true
                  : false,
              message_rep_def_days: params[0].message_rep_def_days,
              company_rep_day: params[0].company_rep_day,
              billing_rep_day: params[0].billing_rep_day,
              dashbd_def_days: params[0].dashbd_def_days,
              device_rep_def_days: params[0].device_rep_def_days,
              coyDirectory: params[0]?.coyDirectory,
            };
          }),
          tap((data) => {
            this.companyParameter.next(data);
            this.alertMethod.next({
              sms: data.sms,
              email: data.email,
              phone: data.phone,
            });
          })
        )
        .subscribe({ error: () => {} });
    }
  }

  updateCompanyParameter(
    data: CompanyParametersDataForm,
    partner?: boolean
  ): Observable<DefaultDate[]> {
    const companyParameter = this.companyParameter.getValue();
    const alertmethod = this.alertMethod.getValue();

    this.alertMethod.next({
      sms: data.sms,
      email: data.email,
      phone: data.phone,
    });

    this.companyParameter.next(data);

    return this.corporateEventHttp.updateCompanyParameter(data).pipe(
      mergeMap(() => {
        // if (partner) {
        //   this.companyStore.companyList(data.companyId, true);
        // }
        return this.dateService.defaultDatesParams(data.companyId).pipe(
          tap((date) => {
            this.emitDateParam(date);
          })
        );
      })
    );
    // .subscribe();
  }

  defaultDateParams(subdomain: string, reload?: boolean) {
    if (this.defaultDate.getValue() === null || reload) {
      this.dateService
        .defaultDatesParams(subdomain)
        .pipe(tap((date) => this.emitDateParam(date)))
        .subscribe({ error: () => {} });
    }
  }

  private emitDateParam(date: DefaultDate[]) {
    this.defaultDate.next({
      end_date: date[0].end_date,
      start_billing_rep_date: date[0].start_billing_rep_date,
      start_compy_rep_date: date[0].start_compy_rep_date,
      start_dashbd_date: date[0].start_dashbd_date,
      start_device_rep_date: date[0].start_device_rep_date,
      start_mess_rep_date: date[0].start_mess_rep_date,
    });
  }
}
