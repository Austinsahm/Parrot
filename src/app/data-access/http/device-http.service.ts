import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  Device,
  DeviceConfigurationDirectory,
  DeviceConfigurationFormData,
  DeviceDetail,
  DeviceMoreDetail,
  DeviceSensorDirectory,
} from "../models/device.model";
import { Response, StatusCode } from "../models/http.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

/**
 * NOTE: DO NOT USE THIS SERVICE DIRECTLY IN ANY COMPONENT. USE THE CORRESPONDING DATA ACCESS SERVICE.
 */
@Injectable()
export class DeviceHttpService extends BaseHttpService {
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
   * Fetches all available devices for the given subdomain
   * @param subdomain
   */
  fetch(subdomain: string, userId?: string): Observable<Device[]> {
    const url = this.buildUrl(
      `device/device-directory/list/companyId/${subdomain}/userId/${this.userId}`
    );
    return this.check(this.httpClient.get<Response<Device[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  /**
   * Fetches all available devices list for the given subdomain
   * @param subdomain
   */
  fetchList(subdomain: string, userId?: string): Observable<Device[]> {
    const url = this.buildUrl(
      `device/list/companyId/${subdomain}/userId/${this.userId}`
    );
    return this.check(this.httpClient.get<Response<Device[]>>(url));
  }

  /**
   * Returns details of a specific device
   * @param deviceId
   */
  findById(deviceId: string, subdomain: string): Observable<DeviceDetail> {
    const url = this.buildUrl(
      `device/specific-device-detail/deviceId/${deviceId}`
    );
    return this.check(this.httpClient.get<Response<DeviceDetail>>(url));
  }

  /**
   * Fetches all available devices for the given subdomain
   * @param subdomain
   */
  fetchConfigDirectory(
    subdomain: string,
    userId: string
  ): Observable<DeviceConfigurationDirectory[]> {
    const url = this.buildUrl(
      `device/device-configuration-directory/companyId/${subdomain}/userId/${userId}`
    );
    return this.check(
      this.httpClient.get<Response<DeviceConfigurationDirectory[]>>(url)
    );
  }

  fetchMoreDeviceDetails(
    lastSeenMsgId: string
  ): Observable<DeviceMoreDetail[]> {
    const url = this.buildUrl(
      `device/device-info/list/lastSeenMsgId/${lastSeenMsgId}`
    );
    return this.check(this.httpClient.get<Response<DeviceMoreDetail[]>>(url));
  }

  updateDeviceConfiguration(
    reqBody: DeviceConfigurationFormData
  ): Observable<any> {
    const url = this.buildUrl(`device/update-device-config-parameter`);
    return this.httpClient.put(url, reqBody);
  }

  deleteDeviceConfiguration(
    reqBody: { deviceSensorTransId: string }[]
  ): Observable<any> {
    const url = this.buildUrl(`device/delete-device_sensor`);
    return this.httpClient.post(url, reqBody);
  }
}
