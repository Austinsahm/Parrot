import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  Asset,
  AssetDetail,
  AssetFormData,
  ContentType,
  SpecificContentType,
} from "../models/asset.model";
import { Device } from "../models/device.model";
import { Response, StatusCode } from "../models/http.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";
/**
 * NOTE: DO NOT USE THIS SERVICE DIRECTLY IN ANY COMPONENT. USE THE CORRESPONDING DATA ACCESS SERVICE.
 */
@Injectable()
export class AssetHttpService extends BaseHttpService {
  userId: string;

  constructor(
    protected readonly httpClient: HttpClient,
    private userInfoService: UserInfoService,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
  }

  create() {}

  /**
   * Returns all assets for a given comapny by subdomain
   * @param subdomain
   */
  fetch(subdomain: string): Observable<Asset[]> {
    const url = this.buildUrl(`asset/asset-list/companyId/${subdomain}`);
    return this.check(this.httpClient.get<Response<Asset[]>>(url));
  }

  /**
   * Returns details of a particular asset for a given subdomain
   * @param subdomain
   * @param assetId
   */
  find(subdomain: string, assetId: string): Observable<AssetDetail> {
    const url = this.buildUrl(
      `asset/assetDetail/companyId/${subdomain}/assetId/${assetId}`
    );
    return this.check(this.httpClient.get<Response<AssetDetail>>(url));
  }

  fetchAssetDevices(
    subdomain: string,
    assetId: string,
    userId?: string
  ): Observable<Device[]> {
    const url = this.buildUrl(
      `asset/assetDeviceList/companyId/${subdomain}/assetId/${assetId}/userId/${this.userId}`
    );
    return this.check(this.httpClient.get<Response<Device[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
    ]);
  }

  fetchContentTypes(): Observable<ContentType[]> {
    const url = this.buildUrl(`asset/contentTypes`);
    return this.check(this.httpClient.get<Response<ContentType[]>>(url));
  }

  getContentType(contentId: string): Observable<SpecificContentType[]> {
    const url = this.buildUrl(`asset/contentType/${contentId}`);
    return this.check(
      this.httpClient.get<Response<SpecificContentType[]>>(url)
    );
  }

  saveAsset(assetForm: AssetFormData): Observable<any> {
    const url = this.buildUrl(`asset/save-asset`);
    return this.httpClient.post(url, assetForm);
  }
}
