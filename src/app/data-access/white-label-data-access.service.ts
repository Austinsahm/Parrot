import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { DomainHttpService } from './http/domain-http.service';
import { WhiteLabelHttpService } from './http/white-label-http.service';
import { ExceptionBag, WriteResponsePayload } from './models/http.model';
import { WhiteLabel, WhiteLabelDirectory, WhiteLabelFormData } from './models/white-label.model';
import { searchByField } from './utilities/collection.util';

class WhiteLabelDirectoryDataAccessor extends AbstractDataAccessService<WhiteLabelDirectory> {

  private _source$: Observable<WhiteLabelDirectory[]>;

  constructor(
    private readonly subdomain: string,
    private readonly backend: WhiteLabelHttpService,
    private readonly domainBackend: DomainHttpService
  ) {
    super();

    this._source$ = this.backend.fetch(this.subdomain).pipe(
      tap((items) => this.setValues(...items))
    ).pipe(shareReplay(1));
  }

  protected getKey(entry: WhiteLabelDirectory): DataAccessKey {
    return entry.companyId;
  }

  /**
   * Returns available white label directories
   */
  fetch(): Observable<WhiteLabelDirectory[]> {
    if (this.values.length) {
      return of(this.values);
    }

    return this._source$;
  }

  /**
   * Updates white label information
   */
  update(attributes: WhiteLabelFormData): Observable<WriteResponsePayload> {
    return this.backend.update(this.subdomain, attributes);
  }

  /**
   * Finds a single while label by company subdomain
   */
  findBySubdomain(subdomain: string): Observable<WhiteLabelDirectory & WhiteLabel> {
    return this.fetch().pipe(
      concatMap((items) => {
        const item = items.find(item => item.subdomain === subdomain);

        if (!item) {
          throw ExceptionBag.NOT_FOUND;
        }

        return this.domainBackend.find(subdomain).pipe(
          map((domain) => {
            return Object.assign(item, domain);
          })
        )
      })
    );
  }

  /**
   * Returns items matching given keywords
   * @param keywords 
   */
  search(keywords?: string): Observable<WhiteLabelDirectory[]> {
    const source$ = this.fetch();
    if (!keywords) {
      return source$;
    }

    return source$.pipe(
      map((items) => searchByField(items, (item) => `${item.companyName} ${item.subdomain}`, keywords))
    );
  }
}

interface WhiteLabelAccessorType {
  directory: WhiteLabelDirectoryDataAccessor;
}

@Injectable()
export class WhiteLabelDataAccessService {

  private readonly _mappings = new Map<string, WhiteLabelAccessorType>();

  constructor(
    private readonly backend: WhiteLabelHttpService,
    private readonly domainBackend: DomainHttpService

  ) { }

  /**
   * Returns an accessor for a given subdomain
   * @param subdomain 
   */
  getAccessor(subdomain: string): WhiteLabelAccessorType {
    if (!this._mappings.has(subdomain)) {
      this._mappings.set(subdomain, {
        directory: new WhiteLabelDirectoryDataAccessor(subdomain, this.backend, this.domainBackend)
      });
    }

    return this._mappings.get(subdomain);
  }
}
