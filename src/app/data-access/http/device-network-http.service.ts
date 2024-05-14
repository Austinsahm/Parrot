import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/http.model';
import { DeviceNetwork } from '../models/network.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class DeviceNetworkHttpService extends BaseHttpService {

  /**
   * Returns all available device networks
   */
  fetch(): Observable<DeviceNetwork[]> {
    const url = this.buildUrl('device/device-networks');
    return this.check(
      this.httpClient.get<Response<DeviceNetwork[]>>(url)
    )
  }
}
