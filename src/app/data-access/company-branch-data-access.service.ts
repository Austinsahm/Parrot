import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { CompanyBranchHttpService } from "./http/company-branch-http.service";
import { CompanyBranch } from "./models/company.model";
import { ExceptionBag } from "./models/http.model";

export class CompanyBranchAccessor extends AbstractDataAccessService<CompanyBranch> {
  private readonly _source: Observable<CompanyBranch[]>;

  constructor(
    private readonly subdomain: string,
    private readonly backend: CompanyBranchHttpService
  ) {
    super();

    this._source = this.backend.fetch(this.subdomain);
    // .pipe(shareReplay(10));
  }

  protected getKey(entry: CompanyBranch): DataAccessKey {
    return entry.locationId;
  }

  /**
   * Returns all branches for this accessor
   */
  fetch(reload = false): Observable<CompanyBranch[]> {
    if (this.values.length && !reload) {
      return of(this.values);
    }

    return this._source.pipe(tap((branches) => this.setValues(...branches)));
  }

  /**
   * Returns a location by Id
   * @param locationId
   */
  findById(locationId: string): Observable<CompanyBranch> {
    return this.fetch().pipe(
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
   * Returns a location by name
   * @param locationName
   */
  findByName(locationName: string): Observable<CompanyBranch> {
    return this.fetch().pipe(
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
}

@Injectable()
export class CompanyBranchDataAccessService {
  private readonly _mappings: Map<string, CompanyBranchAccessor>;

  constructor(private readonly backend: CompanyBranchHttpService) {
    this._mappings = new Map<string, CompanyBranchAccessor>();
  }

  /**
   * Returns an access for the given subdomain
   * @param subdomain
   */
  getAccessor(subdomain: string): CompanyBranchAccessor {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(
        subdomain,
        new CompanyBranchAccessor(subdomain, this.backend)
      );
    }

    return this._mappings.get(subdomain);
  }
}
