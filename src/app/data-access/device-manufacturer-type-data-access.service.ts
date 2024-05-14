import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { DeviceManufacturerTypeHttpService } from './http/device-manufacturer-type-http.service';
import { DeviceManufacturerType, DeviceManufacturerTypeDirectory } from './models/manufacturer.model';

export class DeviceManufacturerTypeDataAccessor extends AbstractDataAccessService<DeviceManufacturerType>{

  private readonly _source$;

  constructor(
    private readonly manufacturerId: string,
    private readonly backend: DeviceManufacturerTypeHttpService
  ) {
    super();

    this._source$ = this.backend.fetch(this.manufacturerId).pipe(
      tap((types) => this.setValues(...types))
    ).pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceManufacturerType): DataAccessKey {
    return entry.manufDeviceTypeId;
  }

  fetch(): Observable<DeviceManufacturerType[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }
}


export class DeviceManufacturerTypeDirectoryDataAccessor extends AbstractDataAccessService<DeviceManufacturerTypeDirectory>{

  private readonly _source$;

  constructor(
    private readonly backend: DeviceManufacturerTypeHttpService
  ) {
    super();

    this._source$ = this.backend.fetchDirectory().pipe(
      tap((types) => this.setValues(...types))
    ).pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceManufacturerType): DataAccessKey {
    return entry.manufDeviceTypeId;
  }

  fetch(): Observable<DeviceManufacturerTypeDirectory[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }

  findById(typeId: string): Observable<DeviceManufacturerTypeDirectory> {
    return this.backend.findDirectoryById(typeId);
  }
}


@Injectable()
export class DeviceManufacturerTypeDataAccessService {

  private readonly _mappings = new Map<string, DeviceManufacturerTypeDataAccessor>();

  constructor(private readonly backend: DeviceManufacturerTypeHttpService) { }

  /**
   * Returns types accessor for a given manufacturere Id
   * @param manufacturerId
   */
  getAccessor(manufacturerId: string): DeviceManufacturerTypeDataAccessor {
    if (!this._mappings.has(manufacturerId)) {
      this._mappings.set(manufacturerId, new DeviceManufacturerTypeDataAccessor(manufacturerId, this.backend));
    }

    return this._mappings.get(manufacturerId);
  }

  getDirectoryAccessor(): DeviceManufacturerTypeDirectoryDataAccessor {
    return new DeviceManufacturerTypeDirectoryDataAccessor(this.backend);
  }
}
