import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import { Response, StatusCode } from "../models/http.model";
import {
  AuthCompanyRole,
  RoleAuthorizationUpdate,
  SpecificCompanyRole,
} from "../models/role-authorization.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable({
  providedIn: "root",
})
export class RoleAuthorizationHttpService extends BaseHttpService {
  private userId: string;
  private companyId: string;

  constructor(
    private userInfoService: UserInfoService,
    protected readonly httpClient: HttpClient,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
    this.companyId = userInfoService.getUserInfo().userCompanyId;
  }

  fetch(companyId?: string): Observable<AuthCompanyRole[]> {
    let company = companyId ?? this.companyId;
    const url = this.buildUrl(`role/company-role/companyId/${company}`);
    return this.check(this.httpClient.get<Response<AuthCompanyRole[]>>(url));
  }

  fetchSpecificRole(roleId: string): Observable<SpecificCompanyRole[]> {
    const url = this.buildUrl(
      `role/specific-role-authorization/roleId/${roleId}`
    );
    return this.check(
      this.httpClient.get<Response<SpecificCompanyRole[]>>(url)
    );
  }

  updateSpecificRole(data: RoleAuthorizationUpdate): Observable<any> {
    const url = this.buildUrl(`role/update-menu-access`);
    return this.check(this.httpClient.put<Response<any>>(url, data), [
      StatusCode.CREATED,
      StatusCode.OK,
    ]);
  }
}
