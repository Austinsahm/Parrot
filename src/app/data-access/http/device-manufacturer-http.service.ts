import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/http.model';
import { DeviceManufacturer, DeviceManufacturerDirectory } from '../models/manufacturer.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class DeviceManufacturerHttpService extends BaseHttpService {

  /**
   * Returns available device manufacturers
   */
  fetch(): Observable<DeviceManufacturer[]> {
    const url = this.buildUrl('device/device-manufacturer');
    return this.check(
      this.httpClient.get<Response<DeviceManufacturer[]>>(url)
    )
  }

  /**
   * Returns available device manufacturers
   */
  fetchDirectory(): Observable<DeviceManufacturerDirectory[]> {
    const url = this.buildUrl('setup/device-manufacturer-directory');
    return this.check(
      this.httpClient.get<Response<DeviceManufacturerDirectory[]>>(url)
    )
  }

   /**
   * Returns available device manufacturers
   * @param manufacturerId
   */
  findDirectoryById(manufacturerId: string): Observable<DeviceManufacturerDirectory> {
    const url = this.buildUrl(`setup/device-manufacturer-specific/manufacturerId/${manufacturerId}`);
    return this.check(
      this.httpClient.get<Response<DeviceManufacturerDirectory>>(url)
    )
  }
}
