import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { CompanyTypeHttpService } from './http/company-type-http.service';
import { CompanyType } from './models/company.model';
import { ExceptionBag } from './models/http.model';

@Injectable()
export class CompanyTypeDataAccessService extends AbstractDataAccessService<CompanyType> {

  private readonly _source: Observable<CompanyType[]>;

  constructor(private readonly backend: CompanyTypeHttpService) {
    super();
    this._source = this.backend.fetch().pipe(shareReplay(1));
  }

  protected getKey(entry: CompanyType): DataAccessKey {
    return entry.companyTypeId;
  }

  /**
   * Returns all available company types
   */
  fetch(): Observable<CompanyType[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source.pipe(tap((countries) => this.setValues(...countries)));
  }

  /**
   * Finds a single company type by ID
   */
  findById(typeid: string): Observable<CompanyType> {
    return this.fetch().pipe(
      map((types) => {
        const type = types.find(type => type.companyTypeId === typeid);
        if (!type) {
          throw ExceptionBag.NOT_FOUND;
        }
        return type;
      })
    );
  }
}
