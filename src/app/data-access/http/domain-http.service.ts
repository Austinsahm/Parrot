import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domain } from '../models/domain.model';
import { Response } from '../models/http.model';
import { BaseHttpService } from './base-http.service';

/**
 * NOTE: DO NOT USE THIS SERVICE DIRECTLY IN ANY COMPONENT. USE THE CORRESPONDING DATA ACCESS SERVICE.
 */
@Injectable()
export class DomainHttpService extends BaseHttpService {

  /**
   * Fetches a single domain for a given subdomain
   * @param subdomain 
   */
  find(subdomain: string): Observable<Domain> {
    const url = this.buildUrl(`appinit/subdomain/${subdomain}`);
    return this.check(
      this.httpClient.get<Response<Domain>>(url)
    );
  }
}
