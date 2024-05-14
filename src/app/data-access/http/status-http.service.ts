import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/http.model';
import { Status } from '../models/status.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class StatusHttpService extends BaseHttpService {

  /**
   * Returns all available statuses
   */
  fetch(): Observable<Status[]> {
    const url = this.buildUrl('setup/list/status');
    return this.check(
      this.httpClient.get<Response<Status[]>>(url)
    );
  }
}
