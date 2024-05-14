import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { UserInfoService } from "../services/user-info.service";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { DeviceHttpService } from "./http/device-http.service";
import {
  Device,
  DeviceConfigurationDirectory,
  DeviceDetail,
  DeviceDirectory,
} from "./models/device.model";
import { ExceptionBag } from "./models/http.model";
import { searchByField } from "./utilities/collection.util";

export class DeviceDataAccessor extends AbstractDataAccessService<Device> {
  private readonly _source: Observable<Device[]>;
  private readonly _configSrouce: Observable<DeviceConfigurationDirectory[]>;

  constructor(
    private readonly subdomain: string,
    private readonly backend: DeviceHttpService,
    private readonly userId: string
  ) {
    super();

    this._source = this.backend.fetch(this.subdomain);
    this._configSrouce = this.backend.fetchConfigDirectory(
      this.subdomain,
      this.userId
    );
  }

  protected getKey(entry: Device): DataAccessKey {
    return entry.deviceId;
  }

  /**
   * Returns all devices for a given subdomain
   * @param subdomain
   */
  fetch(refresh?: boolean): Observable<Device[]> {
    if (refresh) {
      return this._source.pipe(tap((devices) => this.setValues(...devices)));
    }

    if (this.values.length) {
      return of(this.values);
    }

    return this._source.pipe(tap((devices) => this.setValues(...devices)));
  }

  fetchDirectory(): Observable<DeviceConfigurationDirectory[]> {
    return this._configSrouce;
  }

  /**
   * Returns all devices with a given category name
   * @param categoryName
   */
  fetchByCategoryName(categoryName: string): Observable<Device[]> {
    return this.fetch(true).pipe(
      map((devices) => {
        return devices.filter((device) => {
          return device.deviceCategName === categoryName;
        });
      })
    );
  }

  /**
   * Returns all devices with a given category Id
   * @param categoryName
   */
  fetchByCategoryId(categoryName: string): Observable<Device[]> {
    throw new Error(
      'Device entities/models do not currently have a "categoryId" property defined.'
    );
    /* return this.fetch().pipe(
            map((devices) => {
                return devices.filter(device => device.deviceCategName === categoryName);
            })
        ); */
  }

  /**
   * Finds a single device by Id
   * @param deviceId
   */
  findById(deviceId: string, subdomain: string): Observable<DeviceDetail> {
    return this.backend.findById(deviceId, subdomain);
  }

  /**
   * Finds a single device by Id
   * @param deviceId
   */
  findDirectoryByConfigId(
    configId: string
  ): Observable<DeviceConfigurationDirectory> {
    return this.fetchDirectory().pipe(
      map((devices) => {
        const value = devices.find((device) => device.configId === configId);
        if (!value) {
          throw ExceptionBag.NOT_FOUND;
        }
        return value;
      })
    );
  }

  /**
   * Returns all devices with a given asset name
   * @param assetName
   */
  fetchByAssetName(assetName: string): Observable<Device[]> {
    return this.fetch().pipe(
      map((devices) => {
        return devices.filter((device) => device.assetName === assetName);
      })
    );
  }

  /**
   * Fetches devices
   * @param keywords
   */
  search(keywords?: string): Observable<Device[]> {
    const source$ = this.fetch();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(
      map((devices) => {
        return searchByField(devices, (device) => device.deviceName, keywords);
      })
    );
  }

  /**
   * Fetches devices
   * @param keywords
   */
  searchDirectory(
    keywords?: string
  ): Observable<DeviceConfigurationDirectory[]> {
    const source$ = this.fetchDirectory();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(
      map((devices) => {
        return searchByField(devices, (device) => device.deviceName, keywords);
      })
    );
  }
}

@Injectable()
export class DeviceDataAccessService {
  private readonly _mappings = new Map<string, DeviceDataAccessor>();

  constructor(private readonly backend: DeviceHttpService) {}

  /**
   * Returns accessor for a given subdomain
   */
  getAccessor(subdomain: string, userId?: string): DeviceDataAccessor {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(
        subdomain,
        new DeviceDataAccessor(subdomain, this.backend, userId)
      );
    }

    return this._mappings.get(subdomain);
  }

  destroyAccessor(subdomain: string): void {
    if (this._mappings.has(subdomain)) {
      this._mappings.delete(subdomain);
    }
  }
}

@Injectable()
export class DeviceDataAccessListService {
  private readonly _mappings = new Map<string, DeviceDataAccessorList>();

  constructor(private readonly backend: DeviceHttpService) {}

  /**
   * Returns accessor for a given subdomain
   */
  getAccessor(subdomain: string, userId: string): DeviceDataAccessorList {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(
        subdomain,
        new DeviceDataAccessorList(subdomain, this.backend, userId)
      );
    }

    return this._mappings.get(subdomain);
  }
}

export class DeviceDataAccessorList extends AbstractDataAccessService<Device> {
  private readonly _source: Observable<Device[]>;
  private readonly _configSrouce: Observable<DeviceConfigurationDirectory[]>;

  constructor(
    private readonly subdomain: string,
    private readonly backend: DeviceHttpService,
    private userId: string
  ) {
    super();

    this._source = this.backend.fetchList(this.subdomain).pipe(shareReplay(1));
    this._configSrouce = this.backend
      .fetchConfigDirectory(this.subdomain, this.userId)
      .pipe(shareReplay(1));
  }

  protected getKey(entry: Device): DataAccessKey {
    return entry.deviceId;
  }

  /**
   * Returns all devices for a given subdomain
   * @param subdomain
   */
  fetch(): Observable<Device[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source.pipe(tap((devices) => this.setValues(...devices)));
  }
}
