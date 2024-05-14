import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { DeviceSensorHttpService } from "./http/device-sensor-http.service";
import {
  DeviceConfigurationDirectory,
  DeviceSensorDirectory,
  SensorComboEntry,
} from "./models/device.model";
import { ExceptionBag } from "./models/http.model";

export class DeviceSensorDirectoryDataAccessor extends AbstractDataAccessService<DeviceSensorDirectory> {
  private readonly _source: Observable<DeviceSensorDirectory[]>;

  constructor(
    private readonly configId: string,
    private readonly backend: DeviceSensorHttpService
  ) {
    super();

    this._source = this.backend
      .fetchDirectory(this.configId)
      .pipe(tap((devices) => this.setValues(...devices)))
      .pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceSensorDirectory): DataAccessKey {
    return entry.configId;
  }

  /**
   * Returns all device sensor directorie
   */
  fetch(): Observable<DeviceSensorDirectory[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  findById(configId: string): Observable<DeviceSensorDirectory> {
    return this.fetch().pipe(
      map((devices) => {
        const device = devices.find((device) => device.configId === configId);

        if (device) {
          return device;
        }

        throw ExceptionBag.NOT_FOUND;
      })
    );
  }
}

export class DeviceSensorComboDataAccessor extends AbstractDataAccessService<SensorComboEntry> {
  private readonly _source: Observable<SensorComboEntry[]>;

  constructor(
    private readonly configId: string,
    private readonly backend: DeviceSensorHttpService,
    private device: DeviceConfigurationDirectory
  ) {
    super();

    this._source = this.backend
      .fetchSensorCombo(this.device)
      .pipe(tap((devices) => this.setValues(...devices)))
      .pipe(shareReplay(1));
  }

  protected getKey(entry: SensorComboEntry): DataAccessKey {
    return entry.deviceSensorRefId;
  }

  /**
   * Returns all device sensor directorie
   */
  fetch(): Observable<SensorComboEntry[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  findById(deviceSensorRefId: string): Observable<SensorComboEntry> {
    return this.fetch().pipe(
      map((devices) => {
        const device = devices.find(
          (device) => device.deviceSensorRefId === deviceSensorRefId
        );

        if (device) {
          return device;
        }

        throw ExceptionBag.NOT_FOUND;
      })
    );
  }
}

interface DeviceSensorAccessorType {
  directory: DeviceSensorDirectoryDataAccessor;
  combox: DeviceSensorComboDataAccessor;
}

@Injectable()
export class DeviceSensorDataAccessorService {
  private _directory = new Map<string, DeviceSensorDirectoryDataAccessor>();
  private readonly _combo = new Map<string, DeviceSensorComboDataAccessor>();

  constructor(private readonly backend: DeviceSensorHttpService) {}

  /**
   * Returns device senstor directory for a given subdoman
   * @param configId
   */
  getDirectory(configId: string): DeviceSensorDirectoryDataAccessor {
    if (!this._directory.has(configId)) {
      this._directory.set(
        configId,
        new DeviceSensorDirectoryDataAccessor(configId, this.backend)
      );
    }

    return this._directory.get(configId);
  }

  /**
   * Returns an accessor for a given of sensor for a given config Id
   * @param configId
   */
  getComboxAccessor(
    device: DeviceConfigurationDirectory
  ): DeviceSensorComboDataAccessor {
    if (!this._combo.has(device.configId)) {
      this._combo.set(
        device.configId,
        new DeviceSensorComboDataAccessor(device.configId, this.backend, device)
      );
    }

    return this._combo.get(device.configId);
  }

  destroyaccessor(): void {
    this._directory.clear();
  }
}
