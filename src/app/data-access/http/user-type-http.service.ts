import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/http.model';
import { UserType } from '../models/user.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class UserTypeHttpService extends BaseHttpService {

  fetch(): Observable<UserType[]> {
    const url = this.buildUrl('user/user-types');
    return this.check(
      this.httpClient.get<Response<UserType[]>>(url)
    );
  }
}
