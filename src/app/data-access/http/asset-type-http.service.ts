import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetType } from '../models/asset.model';
import { Response } from '../models/http.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class AssetTypeHttpService extends BaseHttpService {

  /**
   * Returns available asset types
   */
  fetch(): Observable<AssetType[]> {
    const url = this.buildUrl('asset/asset-type');
    return this.check(
      this.httpClient.get<Response<AssetType[]>>(url)
    );
  }
}
