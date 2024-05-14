import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { ErrorMessageService } from "../services/error-message.service";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { UserGroupHttpService } from "./http/user-group-http.service";
import { UserGroup } from "./models/group.model";
import { ExceptionBag } from "./models/http.model";
import { searchByField } from "./utilities/collection.util";

@Injectable()
export class UserGroupDataAccessorService extends AbstractDataAccessService<UserGroup> {
  private readonly _source$: Observable<UserGroup[]>;

  constructor(
    private readonly backend: UserGroupHttpService,
    private errMsg: ErrorMessageService
  ) {
    super();

    this._source$ = this.backend.fetch().pipe(
      catchError((err) => {
        if (!err.status) this.errMsg.errorExist("You're probably offline");
        else this.errMsg.errorExist("Unknown Error occured");
        return of([]);
      }),
      tap((roles) => this.setValues(...roles))
    );
  }

  protected getKey(entry: UserGroup): DataAccessKey {
    return entry.roleId;
  }

  fetch(): Observable<UserGroup[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }

  /**
   * Searches for groups matching given keywords
   * @param keywords
   */
  search(keywords?: string): Observable<UserGroup[]> {
    const source$ = this.fetch();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(
      map((groups) =>
        searchByField(groups, (group) => group.roleName, keywords)
      ),
      tap((users) => {
        if (!users.length)
          this.errMsg.errorExist("Your search do not return any result");
        else this.errMsg.clearError();
      })
    );
  }

  /**
   * Returns groups for a given user
   * @param subdomain
   * @param userId
   */
  fetchForUser(subdomain: string, userId: string): Observable<UserGroup[]> {
    return this.backend.fetchForUserById(subdomain, userId);
  }

  findById(roleId: string): Observable<UserGroup> {
    return this.backend.findById(roleId);
  }

  destroyAccessor(): void {
    this.setValues(...[]);
  }
}
