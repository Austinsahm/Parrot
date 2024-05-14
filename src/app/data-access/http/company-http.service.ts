import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UploadStringCompletedEventArgsDescriptionMetadata } from "igniteui-angular-core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  Company,
  CompanyFormData,
  CompanyOrganogram,
  DeviceStat,
  DeviceStatDetail,
  StatDetail,
  UserStatDetail,
  UserStatType,
} from "../models/company.model";
import { Response, StatusCode } from "../models/http.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

/**
 * NOTE: DO NOT USE THIS SERVICE DIRECTLY IN ANY COMPONENT. USE THE CORRESPONDING DATA ACCESS SERVICE.
 */
@Injectable()
export class CompanyHttpService extends BaseHttpService {
  userId: string;

  constructor(
    protected readonly httpClient: HttpClient,
    private userInfoService: UserInfoService,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
  }

  /**
   * Creates a new comapny for a given domain
   * @param subdomain
   * @param details
   */
  create(subdomain: string, details: CompanyFormData) {
    const url = this.buildUrl(`company/create-company`);
    return this.check(this.httpClient.post<Response<any>>(url, details), [
      StatusCode.OK,
      StatusCode.CREATED,
    ]);
  }

  /**
   * Fetches all available companies for a given subdomain
   * @param subdomain
   */
  fetch(subdomain: string): Observable<Company[]> {
    const url = this.buildUrl(
      `company/company-list/companyId/${subdomain}/userId/${this.userId}`
    );
    return this.check(this.httpClient.get<Response<Company[]>>(url));
  }

  fetchUserStatType(subdomain: string): Observable<UserStatType[]> {
    const url = this.buildUrl(
      `company/user-statistics-by-usertype/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<UserStatType[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchUserStatStatus(subdomain: string): Observable<UserStatType[]> {
    const url = this.buildUrl(
      `company/user-statistics-by-status/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<UserStatType[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchAssetStat(subdomain: string): Observable<UserStatType[]> {
    const url = this.buildUrl(`asset/asset-statistics/companyId/${subdomain}`);
    return this.check(this.httpClient.get<Response<UserStatType[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchLocationStat(subdomain: string): Observable<UserStatType[]> {
    const url = this.buildUrl(
      `location/location-statistics/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<UserStatType[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchUserStatTypeDetail(subdomain: string): Observable<UserStatDetail[]> {
    const url = this.buildUrl(
      `company/user-statistics-by-usertype-detail/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<UserStatDetail[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchUserStatStatusDetail(subdomain: string): Observable<UserStatDetail[]> {
    const url = this.buildUrl(
      `company/user-statistics-by-status-detail/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<UserStatDetail[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchAssetStatDetail(subdomain: string): Observable<StatDetail[]> {
    const url = this.buildUrl(
      `asset/asset-statistics-detail/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<StatDetail[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchLocationStatDetail(subdomain: string): Observable<StatDetail[]> {
    const url = this.buildUrl(
      `location/location-statistics-detail/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<StatDetail[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchDeviceStat(subdomain: string): Observable<DeviceStat> {
    const url = this.buildUrl(
      `device/device-statistics/companyId/${subdomain}`
    );
    return this.check(this.httpClient.get<Response<DeviceStat>>(url));
  }

  fetchDeviceStatDetail(
    subdomain: string,
    useCaseId: string,
    day = 5,
    userId?: string
  ): Observable<DeviceStatDetail[]> {
    const url = this.buildUrl(
      `device/device-dashboard/companyId/${subdomain}/day/${day}/userId/${this.userId}/networkId/ALL/useCaseId/${useCaseId}`
    );
    return this.check(this.httpClient.get<Response<DeviceStatDetail[]>>(url));
  }

  fetchOrganogram(subdomain: string): Observable<CompanyOrganogram> {
    const url = this.buildUrl(
      `charts/organogram/companyId/${subdomain}/userId/${this.userId}`
    );
    return this.check(this.httpClient.get<Response<CompanyOrganogram>>(url));
  }
}
