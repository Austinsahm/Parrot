import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Response } from '../models/http.model';
import { City, CityDirectory } from '../models/location.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class CityHttpService extends BaseHttpService {

  /**
   * Fetches all cities for a given state
   * @param stateId 
   */
  fetchForState(countryId: string, fromState: string, toState: string): Observable<City[]> {
    const url = this.buildUrl(`setup/state/cities/state-parts/countryId/${countryId}/fromStateName/${fromState}/toStateName/${toState}`);
    return this.check(
      this.httpClient.get<Response<City[]>>(url)
    );
  }
  
  fetchForStateFromCity(countryId: string, fromState: string, toState: string, fromCity: string): Observable<City[]> {
    const url = this.buildUrl(`setup/state/cities/state-parts-and-city/countryId/${countryId}/fromStateName/${fromState}/toStateName/${toState}/cityName/${fromCity}`);
    return this.check(
      this.httpClient.get<Response<City[]>>(url)
    );
  }

  /**
  * Fetches all cities for a given state
  * @param stateId 
  */
  fetchDirectoryForState(stateId: string): Observable<CityDirectory[]> {
    const url = this.buildUrl(`setup/state-cities/stateId/${stateId}`);
    return this.check(
      this.httpClient.get<Response<CityDirectory[]>>(url)
    );
  }

  /**
  * Fetches all cities
  */
  fetchDirectory(): Observable<CityDirectory[]> {
    const url = this.buildUrl('setup/city-directory');
    return this.check(
      this.httpClient.get<Response<CityDirectory[]>>(url)
    );
  }

  /**
  * Finds a single city directory
  * @param cityId
  */
  fetchDirectoryById(cityId: string): Observable<CityDirectory> {
    const url = this.buildUrl(`setup/city-specific/cityId/${cityId}`);
    return this.check(
      this.httpClient.get<Response<CityDirectory>>(url)
    );
  }
}
