import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { AssetTypeHttpService } from './http/asset-type-http.service';
import { AssetType } from './models/asset.model';
import { ExceptionBag } from './models/http.model';

@Injectable()
export class AssetTypeDataAccessService extends AbstractDataAccessService<AssetType>{

  private readonly _source$: Observable<AssetType[]>;

  constructor(private readonly backend: AssetTypeHttpService) {
    super();

    this._source$ = this.backend.fetch().pipe(
      tap((types) => this.setValues(...types))
    ).pipe(shareReplay(1));
  }

  protected getKey(entry: AssetType): DataAccessKey {
    return entry.assetId;
  }

  /**
   * Returns available asset types
   */
  fetch(): Observable<AssetType[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }

  /**
  * Returns an asset type by id
  * @param typeId 
  */
  findById(typeId: string): Observable<AssetType> {
    return this.fetch().pipe(
      map((types) => {
        const type = types.find(type => type.assetId === typeId);
        if (!type) {
          throw ExceptionBag.NOT_FOUND;
        }
        return type;
      })
    );
  }

  /**
   * Returns an asset type by name
   * @param typeName 
   */
  findByName(typeName: string): Observable<AssetType> {
    return this.fetch().pipe(
      map((types) => {
        const type = types.find(type => type.assetName === typeName);
        if (!type) {
          throw ExceptionBag.NOT_FOUND;
        }
        return type;
      })
    );
  }
}
