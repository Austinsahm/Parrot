import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  ChangePasswordData,
  CompanyTypeCode,
  CompanyUser,
  DeviceAccess,
} from "../models/company.model";
import { Response, StatusCode } from "../models/http.model";
import {
  DefaultCompanyParams,
  SpecificCompanyRole,
} from "../models/role-authorization.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";
// import { UserService } from 'src/app/services/user.service';

/**
 * NOTE: DO NOT USE THIS SERVICE DIRECTLY IN ANY COMPONENT. USE THE CORRESPONDING DATA ACCESS SERVICE.
 */
@Injectable()
export class UserHttpService extends BaseHttpService {
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
    this.companyType = userInfoService.getUserInfo()?.companyTypeName;
    this.companyId = userInfoService.getUserInfo()?.userCompanyId;
  }

  /**
   * Finds a single user by Id
   */
  findById(subdomain: string, userId = this.userId): Observable<CompanyUser> {
    const url = this.buildUrl(
      `user/specific-user/companyId/${subdomain}/userId/${userId}`
    );
    return this.check(this.httpClient.get<Response<CompanyUser>>(url));
  }

  /**
   * returns users for a given subdomain
   */
  fetch(subdomain: string): Observable<CompanyUser[]> {
    const url =
      this.companyType === CompanyTypeCode.PARTNER
        ? this.buildUrl(
            `user/directory-partner/companyId/${subdomain}/userId/${this.userId}`
          )
        : this.buildUrl(`user/directory/companyId/${subdomain}`);

    return this.check(this.httpClient.get<Response<CompanyUser[]>>(url));
  }

  fetchUserCombo(subdomain: string): Observable<CompanyUser[]> {
    const url = this.buildUrl(
      `company/partner-user-combo/companyId/${subdomain}/parentCompanyId/${this.companyId}`
    );
    return this.check(this.httpClient.get<Response<CompanyUser[]>>(url));
  }

  fetchUser(subdomain: string): Observable<CompanyUser[]> {
    const url = this.buildUrl(`user/directory/companyId/${subdomain}`);
    return this.check(this.httpClient.get<Response<CompanyUser[]>>(url));
  }

  /**
   * Fetches users for given subdomain who belong to a given group/role
   * @param subdomain
   * @param groupId
   */
  fetchByGroup(subdomain: string, groupId: string): Observable<CompanyUser[]> {
    const url = this.buildUrl(
      `user/users-and-roles/companyId/${subdomain}/roleId/${groupId}`
    );
    return this.check(this.httpClient.get<Response<CompanyUser[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  createUser(userData: CompanyUser): Observable<any> {
    const url = this.buildUrl(`company/create-user`);
    return this.check(this.httpClient.post<Response<any>>(url, userData), [
      StatusCode.CREATED,
    ]);
  }

  updateUser(userData: CompanyUser): Observable<any> {
    const url = this.buildUrl(`company/update-user`);
    return this.check(this.httpClient.put<Response<any>>(url, userData), [
      StatusCode.CREATED,
      StatusCode.OK,
    ]);
  }

  updatePassword(data: ChangePasswordData): Observable<any> {
    const url = this.buildUrl(`company/change-password`);
    return this.check(this.httpClient.put<Response<any>>(url, data));
  }

  deviceAccessForm(
    subdomain: string,
    userId = this.userId
  ): Observable<DeviceAccess[]> {
    const url = this.buildUrl(
      `role/device-access-form/companyId/${subdomain}/userId/${userId}`
    );
    return this.check(this.httpClient.get<Response<DeviceAccess[]>>(url));
  }

  userAccessDevice(userId = this.userId): Observable<DeviceAccess[]> {
    const url = this.buildUrl(`role/user-access-device/userId/${userId}`);
    return this.check(this.httpClient.get<Response<DeviceAccess[]>>(url));
  }

  insertUserDevice(
    data: { userId: string; deviceId: string }[]
  ): Observable<any> {
    const url = this.buildUrl(`user/insert-user-device`);
    return this.check(this.httpClient.post<any>(url, data));
  }

  roleUserAccessDevice(loginId: string): Observable<SpecificCompanyRole[]> {
    const url = this.buildUrl(`role/user-access-device/loginId/${loginId}`);
    return this.check(
      this.httpClient.get<Response<SpecificCompanyRole[]>>(url)
    );
  }

  defaultParams(subdomain: string): Observable<DefaultCompanyParams> {
    const url = this.buildUrl(
      `company/company-date-parameter/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<DefaultCompanyParams>>(url));
  }
}
