import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, EMPTY, observable, Observable, of } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
// import * as SockJS from "sockjs-client";

import { environment } from "../../environments/environment";
import { catchError, concatMap, filter, map, tap } from "rxjs/operators";
import { Response, StatusCode } from "../data-access/models/http.model";
import { SessionStorageService } from "./session-storage.service";
import { UserDataAccviceessorService } from "../data-access/user-data-accessor.service";
import { UserHttpService } from "../data-access/http/user-http.service";
import {
  CorporatePermissionCategory,
  PartnerPermissionCategory,
  Portal,
} from "../data-access/models/role-authorization.model";
import * as SockJS from "sockjs-client";
import { Client, over } from "stompjs";
import { BaseHttpService } from "../data-access/http/base-http.service";
import { ErrorMessageService } from "./error-message.service";

export enum UserRoleCode {
  ADMINISTRATOR = "1",
  PUBLIC = "2",
}

export interface UserSessionInformation {
  companyName: string;
  companyTypeName: string;
  countryId?: string;
  firstName: string;
  lastName?: string;
  loginId?: string;
  roleId: UserRoleCode;
  roleName: string;
  numCorporate: number;
  numDevice?: number;
  numInactiveDevice: number;
  numActiveDevice: number;
  numIndividual: number;
  numPartner: number;
  userCompanyId: string;
  userId: string;
  creditBalance: number;
  emailAddress: string;
  pryPhoneNo?: string;
  userTypeId?: string;
  locationId?: string;
}

export interface LoginState {
  session?: UserSessionInformation;
  passed?: boolean;
  error?: Error;
}

export interface ForgetPasswordInfo {
  statusCode: string;
  response: {
    description?: string;
    errorCode?: number;
    status: string;
  };
}

export interface ForgetPassword {
  error?: Error;
  status: boolean;
}

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseHttpService {
  apiEndpoint: string;
  private socket$: WebSocketSubject<Partial<UserSessionInformation>>;
  balance = new BehaviorSubject<number>(0);
  balance$ = this.balance.asObservable();

  constructor(
    protected readonly http: HttpClient,
    private sessionService: SessionStorageService,
    private readonly userDataAccessor: UserDataAccviceessorService,
    private userHttpService: UserHttpService,
    protected errMsg: ErrorMessageService
  ) {
    super(http, errMsg);
  }

  login(data: {
    userCompanyId: string;
    userId: string;
    password: string;
  }): Observable<LoginState> {
    const url = this.buildUrl(`user/userDetails`);
    return this.http
      .post<Response<UserSessionInformation>>(url, data)
      .pipe(
        concatMap((payload) => {
          if (payload.statusCode !== StatusCode.OK) {
            return of({
              passed: false,
              session: null,
              error: new Error("Invalid user Id or password."),
            });
          }
          const user = payload.response;
          this.balance.next(user.creditBalance);
          return this.userDataAccessor
            .getAccessor(user.userCompanyId)
            .findById(user.userId)
            .pipe(
              map((profile) => {
                this.userHttpService
                  .roleUserAccessDevice(profile.userId)
                  .subscribe(
                    (e) => {
                      if (
                        user.companyTypeName ===
                          Portal.Corporate.toUpperCase() ||
                        user.companyTypeName === Portal.Individual.toUpperCase()
                      ) {
                        let menus = e.filter(
                          (each) =>
                            each.portal === Portal.Corporate ||
                            each.portal === Portal.Individual
                        );

                        let filteredMenu = menus.reduce((acc, role) => {
                          if (!acc[this.camelCase(role.categName)])
                            acc[this.camelCase(role.categName)] = {};

                          acc[this.camelCase(role.categName)][
                            this.camelCase(role.menuName)
                          ] = {
                            menuName: role.menuName,
                            companyTypeName: role.companyTypeName,
                            menuAccess: this.actionToBool(role.menuAccess),
                            creater: this.actionToBool(role.creater),
                            updater: this.actionToBool(role.updater),
                            reader: this.actionToBool(role.reader),
                            deleter: this.actionToBool(role.deleter),
                          };

                          return acc;
                        }, {} as CorporatePermissionCategory);

                        this.sessionService
                          .setPermission(filteredMenu)
                          .subscribe();
                      }

                      if (
                        user.companyTypeName === Portal.Partner.toUpperCase()
                      ) {
                        let menus = e.filter(
                          (each) => each.portal === Portal.Partner
                        );

                        let filteredMenu = menus.reduce((acc, role) => {
                          if (!acc[this.camelCase(role.categName)])
                            acc[this.camelCase(role.categName)] = {};

                          acc[this.camelCase(role.categName)][
                            this.camelCase(role.menuName)
                          ] = {
                            menuName: role.menuName,
                            companyTypeName: role.companyTypeName,
                            menuAccess: this.actionToBool(role.menuAccess),
                            creater: this.actionToBool(role.creater),
                            updater: this.actionToBool(role.updater),
                            reader: this.actionToBool(role.reader),
                            deleter: this.actionToBool(role.deleter),
                          };

                          return acc;
                        }, {} as PartnerPermissionCategory);

                        this.sessionService
                          .setPermission(filteredMenu)
                          .subscribe();
                      }
                    }
                    // () => {}
                  );

                return {
                  session: Object.assign(profile, payload.response),
                  passed: true,
                };
              })
            );
        })
      )
      .pipe(
        concatMap((state) => {
          if (state.passed) {
            return this.sessionService
              .setUser(state.session)
              .pipe(map(() => state));
          }

          return this.sessionService.deleteUser().pipe(map(() => state));
        })
      );
  }

  // connectWebSocket() {
  //     console.log("junction..");

  //     if (!this.socket$ || this.socket$.closed) {
  //       console.log("corner")
  //     this.socket$ = this.getNewWebSocket();
  //     console.log(this.socket$, 'socket');

  //       this.socket$
  //         .pipe(
  //           tap((data) => {
  //             this.balance.next(data.creditBalance);
  //             console.log(data);
  //           }),
  //         )
  //         .subscribe({error:(e)=>console.log(e)
  //         });
  //     }

  //     // const sock = new SockJS(
  //     //   "https://test.datanucleusinc.com/greensky384/ws/credit-balance"
  //     // );
  //     // sock.onopen = function () {
  //     //   console.log("open");
  //     //   sock.send("test");
  //     // };

  //     // sock.onmessage = function (e) {
  //     //   console.log("message", e.data);
  //     //   sock.close();
  //     // };

  //     // sock.onclose = function () {
  //     //   console.log("close");
  //     // };

  //     // return new Observable<Client>((observer) => {
  //     //   const conn = over(
  //     //     new SockJS(
  //     //       "https://test.datanucleusinc.com/greensky384/ws/credit-balance"
  //     //     )
  //     //   );
  //     //   conn.connect({}, () => {
  //     //     // we are connected
  //     //     observer.next(conn);
  //     //   });
  //     //   return () => conn.disconnect(null);
  //     // });
  //   }

  getNewWebSocket() {
    console.log("junction");

    return webSocket(
      `ws://test.datanucleusinc.com/greensky384/ws/credit-balance/companyId/abcltd`
    );
  }

  close() {
    this.socket$.complete();
  }

  validateDomain(
    subdomain: string,
    successCodes: StatusCode[] = [StatusCode.OK]
  ) {
    const url = this.buildUrl(`appinit/subdomain/${subdomain}`);
    return this.check(this.http.get<Response<any>>(url), successCodes);
  }

  actionToBool(action: string) {
    if (!action) return false;

    let actionInt = parseInt(action);

    return actionInt ? true : false;
  }

  camelCase(title: string) {
    let titleArr = title.split(" ");

    let firstTitle = titleArr[0].split("/");

    if (firstTitle.length === 1)
      return titleArr.reduce((acc, each, index) => {
        if (index === 0) return acc + each.toLowerCase();

        return acc + each;
      }, "");

    let firstTitleJoined = firstTitle[0].toLowerCase() + firstTitle[1];

    let mergedTitle = titleArr.reduce((acc, each, index) => {
      if (index === 0) return acc + "";

      return acc + each;
    }, "");

    return firstTitleJoined + mergedTitle;
  }

  forgetPassword(data: {
    companyId: string;
    loginId: string;
    newPassword: string;
  }): Observable<ForgetPassword> {
    const url = this.buildUrl(`user/forgot-password-change`);
    return this.http.put<Response<ForgetPasswordInfo>>(url, data).pipe(
      concatMap((payload) => {
        if (payload.statusCode !== StatusCode.OK) {
          return of({
            status: false,
            error: new Error("Invalid login Id."),
          });
        }
        return of({ status: true });
      })
    );
  }
}
