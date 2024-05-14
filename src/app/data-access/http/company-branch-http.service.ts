import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyBranch } from '../models/company.model';
import { Response, StatusCode } from '../models/http.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class CompanyBranchHttpService extends BaseHttpService {

  /**
   * Fetches all available branches for a given comapny by domain
   * @param subdomain 
   */
  fetch(subdomain: string): Observable<CompanyBranch[]> {
    const url = this.buildUrl(`company/locations/companyId/${subdomain}`);
    return this.check(
      this.httpClient.get<Response<CompanyBranch[]>>(url),
      [StatusCode.OK, StatusCode.NOT_FOUND]
    )
  }
}
