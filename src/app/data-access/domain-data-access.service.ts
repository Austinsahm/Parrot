import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import {
  AbstractDataAccessService,
  DataAccessKey,
} from "./abstract-data-access.service";
import { DomainHttpService } from "./http/domain-http.service";
import { Domain } from "./models/domain.model";

@Injectable()
export class DomainDataAccessService extends AbstractDataAccessService<Domain> {
  constructor(private readonly backend: DomainHttpService) {
    super([]);
  }

  protected getKey(entry: Domain): DataAccessKey {
    return entry.companyId;
  }

  /**
   * Fetches a single domain information by it's subdomain
   * @param subdomain
   */
  findBySubdomain(subdomain: string): Observable<Domain> {
    const matchedEntry = this.find(subdomain);

    if (matchedEntry) {
      return of(matchedEntry);
    }

    return this.backend.find(subdomain).pipe(
      tap((domain) => {
        if (domain) {
          this.append(domain);
        }
      })
    );
  }
}
