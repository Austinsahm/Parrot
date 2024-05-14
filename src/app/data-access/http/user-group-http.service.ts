import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserInfoService } from "src/app/services/user-info.service";
import { CompanyRole, CompanyTypeCode } from "../models/company.model";
import { UserGroup } from "../models/group.model";
import { Response, StatusCode } from "../models/http.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable()
export class UserGroupHttpService extends BaseHttpService {
  userId: string;
  companyType: string;
  companyId: string;
  constructor(
    protected readonly httpClient: HttpClient,
    private userInfoService: UserInfoService,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
    this.companyType = userInfoService.getUserInfo().companyTypeName;
    this.companyId = userInfoService.getUserInfo().userCompanyId;
  }

  /**
   * Returns available user groups
   */
  fetch(): Observable<UserGroup[]> {
    const url =
      this.companyType === CompanyTypeCode.PARTNER
        ? this.buildUrl(
            `role/partner-role-directory/companyId/${this.companyId}/userId/${this.userId}`
          )
        : this.buildUrl(`user/roles`);
    return this.check(this.httpClient.get<Response<UserGroup[]>>(url));
  }

  /**
   * Returns a single user role by Id
   */
  findById(roleId: string): Observable<UserGroup> {
    const url = this.buildUrl(`user/role-specific/roleId/${roleId}`);
    return this.check(this.httpClient.get<Response<UserGroup>>(url));
  }

  /**
   * Returns available user groups
   */
  fetchForUserById(subdomain: string, userId: string): Observable<UserGroup[]> {
    const url = this.buildUrl(
      `user/user-role/companyId/${subdomain}/userId/${userId}`
    );
    return this.check(
      this.httpClient.get<Response<UserGroup[] | UserGroup>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    ).pipe(map((groups) => (Array.isArray(groups) ? groups : [groups])));
  }

  createRole(userData: CompanyRole): Observable<any> {
    const url = this.buildUrl(`company/create-role`);
    return this.check(this.httpClient.post<Response<any>>(url, userData), [
      StatusCode.CREATED,
      StatusCode.OK,
    ]);
  }

  updateRole(userData: CompanyRole): Observable<any> {
    const url = this.buildUrl(`company/update-role`);
    return this.check(this.httpClient.put<Response<any>>(url, userData), [
      StatusCode.CREATED,
      StatusCode.OK,
    ]);
  }
}
