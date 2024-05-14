import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyType } from '../models/company.model';
import { Response } from '../models/http.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class CompanyTypeHttpService extends BaseHttpService {

  /**
   * Fetches all available company types from the server
   */
  fetch(): Observable<CompanyType[]> {
    const url = this.buildUrl(`setup/companyTypes`);
    return this.check(
      this.httpClient.get<Response<CompanyType[]>>(url)
    );
  }
}
