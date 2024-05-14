import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import { DeviceCategoryFormData, DeviceConfigurationFormData, DeviceFormData } from 'src/app/data-access/models/device.model';

@Injectable()
export class DeviceService {
  apiEndpoint: string;

  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiServerEndpoint;
  }

  getDeviceList(companyId: any): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/device/device-list/${companyId}`);
  }

  createDevice(reqbody: DeviceFormData): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/device/save-device`, reqbody);
  }

  createDeviceCategory(reqbody: DeviceCategoryFormData): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/device/save-client-device-category`, reqbody);
  }

  updateDeviceCategory(reqbody: DeviceCategoryFormData): Observable<any> {
    return this.http.put(`${this.apiEndpoint}/device/update-client-device-category`, reqbody);
  }
}
