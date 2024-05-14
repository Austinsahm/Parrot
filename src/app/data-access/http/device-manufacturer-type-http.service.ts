import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Response } from '../models/http.model';
import { DeviceManufacturerType, DeviceManufacturerTypeDirectory } from '../models/manufacturer.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class DeviceManufacturerTypeHttpService extends BaseHttpService {

  /**
   * Returns a number of manufacturer types for a given manufacturer Id
   * @param manufacturerId
   */
  fetch(manufacturerId: string): Observable<DeviceManufacturerType[]> {
    const url = this.buildUrl(`device/manufacturer-device-type/manufacturerId/${manufacturerId}`);
    return this.check(
      this.httpClient.get<Response<DeviceManufacturerType[]>>(url)
    );
  }

  /**
  * Returns a number of manufacturer types
  */
  fetchDirectory(): Observable<DeviceManufacturerTypeDirectory[]> {
    const url = this.buildUrl('setup/manufacturer-device-type-directory');
    return this.check(
      this.httpClient.get<Response<DeviceManufacturerTypeDirectory[]>>(url)
    );
  }

  /**
 * Finds a type by Id
 * @param typeId
 */
  findDirectoryById(typeId: string): Observable<DeviceManufacturerTypeDirectory> {
    const url = this.buildUrl(`setup/specific-device-manufacturer-type/manufDeviceTypeId/${typeId}`);
    return this.check(
      this.httpClient.get<Response<DeviceManufacturerTypeDirectory>>(url)
    );
  }

  /**
  * Returns a number of manufacturer types for a manufacturer
  * @param manufacturerId
  */
  fetchDirectoryForManufacturer(manufacturerId: string): Observable<DeviceManufacturerTypeDirectory[]> {
    const url = this.buildUrl(`setup/manufacturer-device-type/manufacturerId/${manufacturerId}`);
    return this.check(
      this.httpClient.get<Response<DeviceManufacturerTypeDirectory[]>>(url)
    );
  }
}
