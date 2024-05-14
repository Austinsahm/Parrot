import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { DeviceManufacturerHttpService } from './http/device-manufacturer-http.service';
import { ExceptionBag } from './models/http.model';
import { DeviceManufacturer, DeviceManufacturerDirectory } from './models/manufacturer.model';

@Injectable()
export class DeviceManufacturerDataAccessService extends AbstractDataAccessService<DeviceManufacturer> {

  private readonly _source$: Observable<DeviceManufacturer[]>;

  constructor(private readonly backend: DeviceManufacturerHttpService) {
    super();

    this._source$ = this.backend.fetch().pipe(
      tap((manufacturers) => this.setValues(...manufacturers))
    ).pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceManufacturer): DataAccessKey {
    return entry.manufacturerId;
  }

  /**
   * Returns available device manufacturers
   */
  fetch(): Observable<DeviceManufacturer[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }

  /**
   * Finds a single manufacture by Id
   * @param manufacturerId 
   */
  findById(manufacturerId: string): Observable<DeviceManufacturer> {
    return this.fetch().pipe(
      map((manufacturers) => {
        const manufacturer = manufacturers.find(manufacturer => manufacturer.manufacturerId === manufacturerId);
        if (!manufacturer) {
          throw ExceptionBag.NOT_FOUND;
        }
        return manufacturer;
      })
    );
  }

  create() { }

  /**
   * Returns available device manufacturers
   */
  fetchDirectory(): Observable<DeviceManufacturerDirectory[]> {
    return this.backend.fetchDirectory();
  }

  /**
   * Finds a single manufacture by Id
   * @param manufacturerId 
   */
  findDirectoryById(manufacturerId: string): Observable<DeviceManufacturerDirectory> {
   return this.backend.findDirectoryById(manufacturerId);
  }

}
