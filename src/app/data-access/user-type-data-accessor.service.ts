import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { UserTypeHttpService } from './http/user-type-http.service';
import { UserType } from './models/user.model';

@Injectable()
export class UserTypeDataAccessorService extends AbstractDataAccessService<UserType> {

  private readonly _source$: Observable<UserType[]>;

  constructor(private readonly backend: UserTypeHttpService) {
    super();

    this._source$ = this.backend.fetch().pipe(
      tap((types) => this.setValues(...types))
    ).pipe(shareReplay(1));
  }

  protected getKey(entry: UserType): DataAccessKey {
    return entry.userTypeId;
  }

  fetch(): Observable<UserType[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }
}
