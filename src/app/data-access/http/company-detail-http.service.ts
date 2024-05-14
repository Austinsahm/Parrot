import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyDetail, CompanyUser } from '../models/company.model';
import { Response, StatusCode } from '../models/http.model';
import { BaseHttpService } from './base-http.service';

/**
 * NOTE: DO NOT USE THIS SERVICE DIRECTLY IN ANY COMPONENT. USE THE CORRESPONDING DATA ACCESS SERVICE.
 */
@Injectable()
export class CompanyDetailHttpService extends BaseHttpService {

  /**
   * Fetches details for a given company by company subdomain
   * @param subdomain 
   */
  find(subdomain: string): Observable<CompanyDetail> {
    const url = this.buildUrl(`company/details/companyId/${subdomain}`);
    return this.check(
      this.httpClient.get<Response<CompanyDetail>>(url).pipe(map((response) => {
        //This endpoint returns a value even if no corresponding record is found for the given 
        //subdomain. When this happens, the returned record has the 'type' property to be null.
        //We are putting additional checks in place so we can give the caller a correct message.
        if (response.statusCode === StatusCode.OK && !response.response.type) {
          response.statusCode = StatusCode.NOT_FOUND;
        }
        return response;
      }))
    );
  }
}
