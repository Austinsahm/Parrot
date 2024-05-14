import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceConfigurationDirectory, DeviceSensorDirectory, SensorComboEntry, SensorMeasure } from '../models/device.model';
import { Response, StatusCode } from '../models/http.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class DeviceSensorHttpService extends BaseHttpService {

  /**
   * Returns device sensor director
   * @param configId 
   */
  fetchDirectory(configId: string): Observable<DeviceSensorDirectory[]> {
    const url = this.buildUrl(`device/device-configuration-subform/configId/${configId}`);
    return this.check(
      this.httpClient.get<Response<DeviceSensorDirectory[]>>(url),
      [StatusCode.NOT_FOUND, StatusCode.OK]
    );
  }

  /**
   * Returns device sensor combo lists
   * @param configId 
   */
  fetchSensorCombo({deviceId, manufacturerId, manufDeviceTypeId, configId}: DeviceConfigurationDirectory ): Observable<SensorComboEntry[]> {
    const url = this.buildUrl(`setup/specific-sensor-device-type/deviceId/${deviceId}/manufacturerId/${manufacturerId}/manufdevicetypeId/${manufDeviceTypeId}/configId/${configId}`);
    return this.check(
      this.httpClient.get<Response<SensorComboEntry[]>>(url)
    );
  }

  fetchSensorMeasure(configId: string, deviceSensorRefId: string): Observable<SensorMeasure[]> {
    const url = this.buildUrl(`setup/specific-sensor-measures/configId/${configId}/devicesensorrefId/${deviceSensorRefId}`);
    return this.check(
      this.httpClient.get<Response<SensorMeasure[]>>(url)
    );
  }

}
