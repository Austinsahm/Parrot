import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { UserInfoService } from '../services/user-info.service';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { CityHttpService } from './http/city-http.service';
import { ExceptionBag } from './models/http.model';
import { City, CityDirectory } from './models/location.model';

class CityDataAccessor extends AbstractDataAccessService<City> {

  private _fetched = false;
  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  countryId: string;

  private _source: Observable<City[]>;

  constructor(private readonly fromState: string,
     private readonly toState: string,
     private readonly backend: CityHttpService,
     private userInfoService: UserInfoService
     ) {
    super([]);

    this.countryId = userInfoService.getUserInfo()?.countryId

    this._source = this.backend.fetchForState(this.countryId, fromState, toState).pipe(shareReplay(1));
  }

  protected getKey(entry: City): DataAccessKey {
    return entry.cityId;
  }

  /**
   * Returns an observable containing all cities in this accessor
   */
  fetch(fromCityName?: string): Observable<City[]> {

    if(fromCityName){
      this._source = this.backend.fetchForStateFromCity(this.countryId, this.fromState, this.toState, fromCityName);
      return this._source.pipe(tap((cities) => this.setValues(...cities)));
    }

    if (this.values.length) {
      return of(this.values);
    }
    return this._source.pipe(tap((cities) => this.setValues(...cities)));
  }

  /**
   * Finds a single city by id in the accessor
   * @param cityId 
   */
  findById(cityId: string): Observable<City> {
    return this.fetch().pipe(map((cities) => {
      const city = cities.find((curCity) => curCity.cityId === cityId);

      if (!city) {
        throw ExceptionBag.NOT_FOUND;
      }

      return city;
    }));
  }
}

class CityDirectoryDataAccessor extends AbstractDataAccessService<CityDirectory> {

  private _fetched = false;
  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  private _source: Observable<CityDirectory[]>;

  constructor(private readonly backend: CityHttpService) {
    super([]);

    this._source = this.backend.fetchDirectory().pipe(shareReplay(1));
  }

  protected getKey(entry: CityDirectory): DataAccessKey {
    return entry.cityId;
  }


  /**
   * Returns an observable containing all cities in this accessor
   */
  fetch(): Observable<CityDirectory[]> {
    return this.backend.fetchDirectory();
  }

  /**
   * Fetches cities for a given state
   * @param stateId
   */
  fetchForState(stateId: string): Observable<CityDirectory[]> {
    return this.backend.fetchDirectoryForState(stateId);
  }


  /**
   * Finds a single city by id in the accessor
   * @param cityId 
   */
  findById(cityId: string): Observable<CityDirectory> {
    return this.backend.fetchDirectoryById(cityId);
  }
}

@Injectable()
export class CityDataAccessService {

  private readonly _mappings: Map<string, CityDataAccessor>;

  constructor(private readonly backend: CityHttpService) {
    this._mappings = new Map<string, CityDataAccessor>();
  }

  /**
   * Returns a service for accessing cities for a given state
   * @param stateId 
   */
  getAccessor(stateId: string, fromState?: string, toState?: string): CityDataAccessor {
    if (!this._mappings.has(stateId)) {
      this._mappings.set(stateId, new CityDataAccessor(fromState, toState, this.backend, new UserInfoService()));
    }

    return this._mappings.get(stateId);
  }

  getDirectoryAccessor(): CityDirectoryDataAccessor {
    return new CityDirectoryDataAccessor(this.backend);
  }
}
