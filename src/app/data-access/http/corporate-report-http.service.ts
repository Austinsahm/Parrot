import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Device, DeviceMessage } from '../models/device.model';
import { Response, StatusCode } from '../models/http.model';
import { CorporateDeviceListReportFilter } from '../models/report.model';
import { BaseHttpService } from './base-http.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateReportHttpService extends BaseHttpService {

  userId: string;

    constructor(
        protected readonly httpClient: HttpClient,
        private userInfoService: UserInfoService,    protected errMsg: ErrorMessageService
    ){ 
        super(httpClient, errMsg);
        this.userId = userInfoService.getUserInfo()?.userId;
    }

  /**
   * Generates reports on asset lists
   */
  generateAssetList(subdomain: string): Observable<Device[]> {
    const url = this.buildUrl(`reports/company-asset-report/companyId/${subdomain}`);
    return this.check(
      this.httpClient.get<Response<Device[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  /**
   * Generates reports on asset lists for devices
   */
  generateAssetDeviceList(subdomain: string, assetId: string, userId?: string): Observable<Device[]> {
    const url = this.buildUrl(`reports/device-asset-report/companyId/${subdomain}/assetId/${assetId}/userId/${this.userId}`);
    return this.check(
      this.httpClient.get<Response<Device[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }
  
  generateDeviceHistory(subdomain: string, userId?: string): Observable<Device[]> {
    const url = this.buildUrl(`reports/company-device/companyId/${subdomain}/status/A/userId/${this.userId}`);
    return this.check(
      this.httpClient.get<Response<Device[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  generateDeviceMessages(subdomain: string, deviceId: string, startDeviceNetworkTime: string, stopDeviceNetworkTime: string): Observable<DeviceMessage[]> {
    const url = this.buildUrl(`reports/device-history-report/companyId/${subdomain}/deviceId/${deviceId}/startDeviceNetworkTime/${startDeviceNetworkTime}/stopDeviceNetworkTime/${stopDeviceNetworkTime}`);
    return this.check(
      this.httpClient.get<Response<DeviceMessage[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

   generateDeviceList(subdomain: string, filter: CorporateDeviceListReportFilter): Observable<Device[]> {
    const url = this.buildUrl(`reports/corporate-device-list/startClientDeviceCategId/${filter.fromCategory}/stopClientDeviceCategId/${filter.toCategory}/companyId/${subdomain}/startCreatedDate/${filter.from}/stopCreatedDate/${filter.to}/status/${filter.statusId}/userId/${this.userId}/networkId/${filter.networkId}`);
    return this.check(
      this.httpClient.get<Response<Device[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  generateDeviceListSummary(subdomain: string, filter: CorporateDeviceListReportFilter): Observable<Device[]> {
    const url = this.buildUrl(`reports/corporate-device-list-summary/startClientDeviceCategId/${filter.fromCategory}/stopClientDeviceCategId/${filter.toCategory}/companyId/${subdomain}/startCreatedDate/${filter.from}/stopCreatedDate/${filter.to}/status/${filter.statusId}/userId/${this.userId}`);
    return this.check(
      this.httpClient.get<Response<Device[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

  generateDeviceMessage(subdomain: string, filter: CorporateDeviceListReportFilter): Observable<DeviceMessage[]> {
    const url = this.buildUrl(`reports/device-message-corporate/startClientDeviceCategId/${filter.fromCategory}/stopClientDeviceCategId/${filter.toCategory}/companyId/${subdomain}/startMsgDate/${filter.from}/stopMsgDate/${filter.to}/status/${filter.statusId}/userId/${this.userId}`);
    return this.check(
      this.httpClient.get<Response<DeviceMessage[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    );
  }

}
