import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Response } from '../models/http.model';
import { Country, CountryDetail } from '../models/location.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class CountryHttpService extends BaseHttpService {

  /**
   * Returns all available countries
   */
  fetch(): Observable<Country[]> {
    const url = this.buildUrl('setup/countryList');
    return this.check(
      this.httpClient.get<Response<Country[]>>(url)
    );
  }

  /**
   * Finds a single country by Id
   * @param countryId 
   */
  find(countryId: string): Observable<CountryDetail> {
    const url = this.buildUrl(`setup/country/countryId/${countryId}`);
    return this.check(
      this.httpClient.get<Response<CountryDetail>>(url)
    );
  }
}
