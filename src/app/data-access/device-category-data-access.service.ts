import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { DeviceCategoryHttpService } from './http/device-category-http.service';
import { DeviceCategory, DeviceCategoryDirectory, DeviceCategoryView } from './models/device.model';
import { ExceptionBag } from './models/http.model';
import { searchByField } from './utilities/collection.util';

/**
 * Accessor for accessing only device category directory information
 */
class DeviceCategoryDirectoryDataAccessor extends AbstractDataAccessService<DeviceCategoryDirectory>{

  private readonly _source: Observable<DeviceCategoryDirectory[]>;

  constructor(private readonly subdomain: string, private readonly backend: DeviceCategoryHttpService, private readonly deviceCategName: string) {
    super();

    this._source = deviceCategName ?  this.backend.fetchToDirectory(this.subdomain, deviceCategName) : this.backend.fetchDirectory(this.subdomain)
      .pipe(tap((categories) => this.setValues(...categories)))
      .pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceCategoryDirectory): DataAccessKey {
    return entry.deviceCategId;
  }

  /**
   * Returns category directories
   */
  fetch(): Observable<DeviceCategoryDirectory[]> {

    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  /**
   * Returns a single category by Id
   * @param categoryId 
   */
  findById(categoryId: string): Observable<DeviceCategoryDirectory> {
    return this.fetch().pipe(
      map((categories) => {
        const category = categories.find(category => category.deviceCategId === categoryId);
        if (!category) {
          throw ExceptionBag.NOT_FOUND;
        }
        return category;
      })
    );
  }

  /**
   * Returns a single category by name
   * @param categoryName
   */
  findByName(categoryName: string): Observable<DeviceCategoryDirectory> {
    return this.fetch().pipe(
      map((categories) => {
        const category = categories.find(category => category.deviceCategId === categoryName);
        if (!category) {
          throw ExceptionBag.NOT_FOUND;
        }
        return category;
      })
    );
  }

  /**
   * Performs search of available category directories
   */
  search(keywords?: string): Observable<DeviceCategoryDirectory[]> {
    const source$ = this.fetch();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(map((categories) => {
      return searchByField(categories, (category) => category.deviceCategName, keywords);
    }));
  }
}

/**
 * Accessor for accessing full device category information
 */
class DeviceCategoryDataAccessor extends AbstractDataAccessService<DeviceCategory>{

  private readonly _source: Observable<DeviceCategory[]>;

  constructor(private readonly subdomain: string, private readonly backend: DeviceCategoryHttpService, private deviceCategId: string,) {
    super();

    this._source = this.backend.fetch(this.subdomain, this.deviceCategId)
      .pipe(tap((categories) => this.setValues(...categories)))
      .pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceCategory): DataAccessKey {
    return entry.deviceCategId;
  }

  /**
   * Returns category directories
   */
  fetch(): Observable<DeviceCategory[]> {

    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  /**
   * Returns a single category by Id
   * @param categoryId 
   */
  findById(categoryId: string): Observable<DeviceCategory> {
    return this.fetch().pipe(
      map((categories) => {
        const category = categories.find(category => category.deviceCategId === categoryId);
        if (!category) {
          throw ExceptionBag.NOT_FOUND;
        }
        return category;
      })
    );
  }

  /**
   * Performs search of available category directories
   */
  search(keywords?: string): Observable<DeviceCategory[]> {
    const source$ = this.fetch();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(map((categories) => {
      return searchByField(categories, (category) => category.deviceCategName, keywords);
    }));
  }
}

/**
 * Accessor for accessing full device category information
 */
class DeviceCategoryViewDataAccessor extends AbstractDataAccessService<DeviceCategoryView>{

  private readonly _source: Observable<DeviceCategoryView[]>;

  constructor(private readonly subdomain: string, private readonly backend: DeviceCategoryHttpService) {
    super();

    this._source = this.backend.fetchView(this.subdomain)
      .pipe(tap((categories) => this.setValues(...categories)))
      .pipe(shareReplay(1));
  }

  protected getKey(entry: DeviceCategoryView): DataAccessKey {
    return entry.deviceCategName;
  }

  /**
   * Returns category directories
   */
  fetch(): Observable<DeviceCategoryView[]> {

    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  /**
   * Returns a single category by name
   * @param categoryName
   */
  findByName(categoryName: string): Observable<DeviceCategoryView> {
    return this.fetch().pipe(
      map((categories) => {
        const category = categories.find(category => category.deviceCategName === categoryName);
        if (!category) {
          throw ExceptionBag.NOT_FOUND;
        }
        return category;
      })
    );
  }

  /**
   * Performs search of available category directories
   */
  search(keywords?: string): Observable<DeviceCategoryView[]> {
    const source$ = this.fetch();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(map((categories) => {
      return searchByField(categories, (category) => category.deviceCategName, keywords);
    }));
  }
}

export interface DeviceCategoryAccessorType {
  full: DeviceCategoryDataAccessor,
  directory: DeviceCategoryDirectoryDataAccessor,
  view: DeviceCategoryViewDataAccessor
}

@Injectable()
export class DeviceCategoryDataAccessService {

  private readonly _mappings = new Map<string, DeviceCategoryAccessorType>();

  constructor(private readonly backend: DeviceCategoryHttpService) { }

  /**
   * Returns accessor services for device category for a given subdomain
   * @param subdomain 
   */
  getAccessor(subdomain: string, deviceCategName?: string, deviceCategId?: string): DeviceCategoryAccessorType {
    if (!this._mappings.has(subdomain)) {
      const accessor = { 
        full: new DeviceCategoryDataAccessor(subdomain, this.backend, deviceCategId),
        directory: new DeviceCategoryDirectoryDataAccessor(subdomain, this.backend, deviceCategName),
        view: new DeviceCategoryViewDataAccessor(subdomain, this.backend)
      };
      if(deviceCategId)
        this._mappings.set(subdomain, accessor)
        return accessor;
    }

    return this._mappings.get(subdomain);
  }

  destroyAccessor(subdomain: string): void {
        if(this._mappings.has(subdomain)){
        this._mappings.delete(subdomain);
        }
    }
}
