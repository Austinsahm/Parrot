import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { ErrorMessageService } from "../services/error-message.service";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { CompanyDetailHttpService } from "./http/company-detail-http.service";
import { UserHttpService } from "./http/user-http.service";
import {
  CompanyDetail,
  CompanyLocation,
  CompanyUser,
} from "./models/company.model";
import { ExceptionBag } from "./models/http.model";
import {
  UserDataAccviceessorService,
  UserDataAccviceessor,
} from "./user-data-accessor.service";
import { searchByField } from "./utilities/collection.util";

export class CompanyDetailDataAccessor extends AbstractDataAccessService<CompanyDetail> {
  private _source$: Observable<CompanyDetail>;

  constructor(
    protected readonly subdomain: string,
    private readonly backend: CompanyDetailHttpService,
    protected readonly userService: UserDataAccviceessor,
    private errMsg: ErrorMessageService
  ) {
    super();

    this._source$ = this.backend
      .find(this.subdomain)
      .pipe(tap((detail) => this.setValues(detail)));
  }

  protected getKey(entry: CompanyDetail): DataAccessKey {
    return entry.type.companyId;
  }

  /**
   * Returns details of comapny
   */
  get(): Observable<CompanyDetail> {
    const target = this.find(this.subdomain);

    if (target) {
      return of(target);
    }

    return this._source$.pipe(
      map((detail) => {
        if (detail) {
          return detail;
        }
        throw ExceptionBag.NOT_FOUND;
      })
    );
  }

  /**
   * Returns all location for current company
   */
  fetchLocations(): Observable<CompanyLocation[]> {
    return this.get().pipe(map((detail) => detail?.companyLocation || []));
  }

  /**
   * Finds a single company location by Id
   */
  findLocationById(locationId: string): Observable<CompanyLocation> {
    return this.fetchLocations().pipe(
      map((locations) => {
        const location = locations.find(
          (location) => location.locationId === locationId
        );
        if (!location) {
          throw ExceptionBag.NOT_FOUND;
        }
        return location;
      })
    );
  }

  /**
   * Finds a single company location by name
   */
  findLocationByName(locationName: string): Observable<CompanyLocation> {
    return this.fetchLocations().pipe(
      map((locations) => {
        const location = locations.find(
          (location) => location.locationName === locationName
        );
        if (!location) {
          throw ExceptionBag.NOT_FOUND;
        }
        return location;
      })
    );
  }

  /**
   * Returns all user associated with current company
   */
  fetchUsers(): Observable<CompanyUser[]> {
    return this.userService.fetch();
  }

  /**
   * Searches for users by given keywords
   */
  searchUsers(keyworkds?: string): Observable<CompanyUser[]> {
    const source$ = this.fetchUsers();

    if (!keyworkds) {
      return source$;
    }

    return source$.pipe(
      catchError((err) => {
        if (!err.status) {
          this.errMsg.errorExist("You're probably offline");
        } else this.errMsg.errorExist("Unknown Error occured");
        return of([]);
      }),
      map((users) =>
        searchByField(
          users,
          (user) => `${user.firstName} ${user.lastName}`,
          keyworkds
        )
      ),
      tap((users) => {
        if (!users.length)
          this.errMsg.errorExist("Your search do not return any result");
        else this.errMsg.clearError();
      })
    );
  }

  /**]
   * Finds a single user by Id
   */
  findUserById(userId: string): Observable<CompanyUser> {
    return this.userService.findById(userId);
  }
}

@Injectable()
export class CompanyDetailDataAccessService {
  private _mappings = new Map<string, CompanyDetailDataAccessor>();

  constructor(
    private readonly backend: CompanyDetailHttpService,
    private readonly userService: UserDataAccviceessorService,
    private errMsg: ErrorMessageService
  ) {}

  /**
   * Returns accessor for a given subdomain
   */
  getAccessor(subdomain: string): CompanyDetailDataAccessor {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(
        subdomain,
        new CompanyDetailDataAccessor(
          subdomain,
          this.backend,
          this.userService.getAccessor(subdomain),
          this.errMsg
        )
      );
    }

    return this._mappings.get(subdomain);
  }

  destroyAccessor(): void {
    this._mappings.clear();
  }
}
