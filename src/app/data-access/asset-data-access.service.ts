import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey, ReactiveStore } from './abstract-data-access.service';
import { AssetHttpService } from './http/asset-http.service';
import { Asset, AssetDetail } from './models/asset.model';
import { Device } from './models/device.model';
import { ExceptionBag } from './models/http.model';
import { searchByField } from './utilities/collection.util';

export class AssetDataAccessor extends AbstractDataAccessService<Asset> {

  private readonly _source: Observable<Asset[]>;
  private readonly __details: ReactiveStore<AssetDetail>;

  constructor(private readonly subdomain: string, private readonly backend: AssetHttpService) {
    super();
    this.__details = new ReactiveStore<AssetDetail>();
    this._source = this.backend.fetch(this.subdomain).pipe(shareReplay(1));
  }

  protected getKey(entry: Asset): DataAccessKey {
    return entry.assetId;
  }

  /**
   * Returns all assets associated with this accessor
   */
  fetch(): Observable<Asset[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source.pipe(tap((assets) => this.setValues(...assets)));
  }

  /**
   * Returns assets that match the given keywords
   * @param keywords 
   */
  search(keywords?: string): Observable<Asset[]> {
    const source$ = this.fetch();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(map((assets) => {
      return searchByField(assets, (asset) => asset.assetName, keywords);
    }));
  }

  /**
   * Finds a single asset by Id for a given subdomain
   * @param assetId 
   */
  findById(assetId: string): Observable<Asset> {
    return this.fetch().pipe(map((assets) => {
      const asset = assets.find((curAsset) => curAsset.assetId === assetId);
      if (!asset) {
        throw ExceptionBag.NOT_FOUND;
      }
      return asset;
    }));
  }

  /**
   * Finds details for an asset identified by a given Id
   * @param assetId 
   */
  findDetail(assetId: string): Observable<AssetDetail> {
    const detail = this.__details.find(assetId);

    if (detail) {
      return of(detail.value);
    }

    return this.backend.find(this.subdomain, assetId).pipe(tap((detail) => {
      this.__details.append({ key: detail.assetId, value: detail });
    }));
  }

  findAssetDevicesById(companyId: string, assetId: string ): Observable<Device[]>{
    return this.backend.fetchAssetDevices(companyId, assetId);
  }
}

@Injectable()
export class AssetDataAccessService {

  private readonly _mappings = new Map<string, AssetDataAccessor>();

  constructor(private readonly backend: AssetHttpService) { }

  /**
   * Returns an accessor for a given subdomain
   * @param subdomain 
   */
  getAccessor(subdomain: string): AssetDataAccessor {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(subdomain, new AssetDataAccessor(subdomain, this.backend));
    }

    return this._mappings.get(subdomain);
  }

  destroyAccessor(subdomain: string): void {
    if(this._mappings.has(subdomain)){
      this._mappings.delete(subdomain);
    }
  }
}
