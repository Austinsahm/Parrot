import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { CountryHttpService } from './http/country-http.service';
import { ExceptionBag } from './models/http.model';
import { Country, CountryDetail } from './models/location.model';

@Injectable()
export class CountryDataAccessService extends AbstractDataAccessService<Country>{

  private readonly _source: Observable<Country[]>;

  constructor(private readonly backend: CountryHttpService) {
    super();
    this._source = this.backend.fetch().pipe(
      tap((countries) => this.setValues(...countries)),
      shareReplay(1));
  }

  protected getKey(entry: Country): DataAccessKey {
    return entry.countryId;
  }


  /**
   * Returns all availables countries
   */
  fetch(): Observable<Country[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source;
  }

  /**
   * Finds a single country by Id
   */
  findById(countryId: string): Observable<CountryDetail> {
    return this.backend.find(countryId);
  }
}
