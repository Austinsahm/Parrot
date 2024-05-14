import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { StatusHttpService } from './http/status-http.service';
import { ExceptionBag } from './models/http.model';
import { Status } from './models/status.model';

@Injectable()
export class StatusDataAccessService extends AbstractDataAccessService<Status> {

  private readonly _source$: Observable<Status[]>;

  constructor(private readonly backend: StatusHttpService) {
    super();

    this._source$ = this.backend.fetch()
      .pipe(tap((statuses) => this.setValues(...statuses)))
      .pipe(shareReplay(1));
  }

  protected getKey(entry: Status): DataAccessKey {
    return entry.statusId;
  }

  /**
   * Returns all statuses
   */
  fetch(): Observable<Status[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }

  /**
   * Returns a single status by Id
   */
  findById(statusId: string): Observable<Status> {
    return this.fetch().pipe(
      map((statuses) => {
        const status = statuses.find(status => status.statusId === statusId);
        if (!status) {
          throw ExceptionBag.NOT_FOUND;
        }
        return status;
      })
    );
  }
}
