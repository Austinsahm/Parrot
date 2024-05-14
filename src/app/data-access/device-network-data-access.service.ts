import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { DeviceNetworkHttpService } from './http/device-network-http.service';
import { ExceptionBag } from './models/http.model';
import { DeviceNetwork } from './models/network.model';

@Injectable()
export class DeviceNetworkDataAccessService extends AbstractDataAccessService<DeviceNetwork> {

  private readonly _source: Observable<DeviceNetwork[]>;

  constructor(private readonly backend: DeviceNetworkHttpService) {
    super();

    this._source = this.backend.fetch()
      .pipe(tap((networks) => this.setValues(...networks)))
      .pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceNetwork): DataAccessKey {
    return entry.networkId;
  }

  /**
   * Returns device networks
   */
  fetch(): Observable<DeviceNetwork[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  /**
   * Returns a single netowrk by Id
   */
  findById(networkId: string): Observable<DeviceNetwork> {
    return this.fetch().pipe(
      map((networks) => {
        const network = networks.find(network => network.networkId === networkId);
        if(!network) {
          throw ExceptionBag.NOT_FOUND;
        }
        return network;
      })
    );
  }
}
