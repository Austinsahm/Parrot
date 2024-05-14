import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { ErrorMessageService } from "../services/error-message.service";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { LocationHttpServiceService } from "./http/location-http-service.service";
import { CorporateLocation } from "./models/location.model";
import { searchByField } from "./utilities/collection.util";

export class LocationDataAccessor extends AbstractDataAccessService<CorporateLocation> {
  private readonly _source: Observable<CorporateLocation[]>;
  // private readonly __details: ReactiveStore<AssetDetail>;

  constructor(
    private readonly subdomain: string,
    private readonly backend: LocationHttpServiceService,
    private errMsg: ErrorMessageService
  ) {
    super();
    // this.__details = new ReactiveStore<AssetDetail>();
    this._source = this.backend.fetch(this.subdomain).pipe(
      catchError((err) => {
        if (!err.status) {
          this.errMsg.errorExist("You're probably offline");
        } else this.errMsg.errorExist("Unknown Error occured");
        return of([]);
      }),
      shareReplay(1)
    );
  }

  protected getKey(entry: CorporateLocation): DataAccessKey {
    return entry.locationId;
  }

  /**
   * Returns all Locations associated with this accessor
   */
  fetch(): Observable<CorporateLocation[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source.pipe(tap((locations) => this.setValues(...locations)));
  }

  /**
   * Returns locations that match the given keywords
   * @param keywords
   */
  search(keywords?: string): Observable<CorporateLocation[]> {
    const source$ = this.fetch();

    if (!keywords) {
      return source$;
    }

    return source$.pipe(
      map((locations) => {
        return searchByField(
          locations,
          (location) => location.locationName,
          keywords
        );
      }),
      tap((locations) => {
        if (!locations.length)
          return this.errMsg.errorExist(
            "Your search do not return any location directory"
          );
        return this.errMsg.clearError();
      })
    );
  }
}

@Injectable({
  providedIn: "root",
})
export class LocationDataAccessService {
  private readonly _mappings = new Map<string, LocationDataAccessor>();

  constructor(
    private readonly backend: LocationHttpServiceService,
    private errMsg: ErrorMessageService
  ) {}

  /**
   * Returns an accessor for a given subdomain
   * @param subdomain
   */
  getAccessor(subdomain: string): LocationDataAccessor {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(
        subdomain,
        new LocationDataAccessor(subdomain, this.backend, this.errMsg)
      );
    }

    return this._mappings.get(subdomain);
  }

  destroyAccessor(subdomain: string): void {
    if (this._mappings.has(subdomain)) {
      this._mappings.delete(subdomain);
    }
  }
}
