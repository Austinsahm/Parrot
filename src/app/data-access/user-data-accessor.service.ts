import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { UserHttpService } from "./http/user-http.service";
import { CompanyUser } from "./models/company.model";
import { DefaultCompanyParams } from "./models/role-authorization.model";

export class UserDataAccviceessor extends AbstractDataAccessService<CompanyUser> {
  private _source$: Observable<CompanyUser[]>;

  constructor(
    private readonly subdomain: string,
    private readonly backend: UserHttpService
  ) {
    super();

    this._source$ = this.backend
      .fetch(this.subdomain)
      .pipe(tap((users) => this.setValues(...users)));
  }

  protected getKey(entry: CompanyUser): DataAccessKey {
    return entry.userId;
  }

  fetch(): Observable<CompanyUser[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }

  // fetchUserCombo(): Observable<CompanyUser[]> {
  //   if (this.values.length) {
  //     return of(this.values);
  //   }

  //   return this._source$;
  // }

  fetchByGroup(groupId: string): Observable<CompanyUser[]> {
    return this.backend.fetchByGroup(this.subdomain, groupId);
  }

  findById(userId: string): Observable<CompanyUser> {
    return this.backend.findById(this.subdomain, userId);
  }

  fetchCompanyParams(): Observable<DefaultCompanyParams> {
    return this.backend.defaultParams(this.subdomain);
  }
}

@Injectable()
export class UserDataAccviceessorService {
  private _mappings = new Map<string, UserDataAccviceessor>();

  constructor(private readonly backend: UserHttpService) {}

  getAccessor(subdomain: string): UserDataAccviceessor {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(
        subdomain,
        new UserDataAccviceessor(subdomain, this.backend)
      );
    }

    return this._mappings.get(subdomain);
  }

  destroyAccessor(): void {
    this._mappings.clear();
  }
}
