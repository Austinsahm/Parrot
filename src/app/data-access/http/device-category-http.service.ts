import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceCategory, DeviceCategoryDirectory, DeviceCategoryView } from '../models/device.model';
import { Response, StatusCode } from '../models/http.model';
import { BaseHttpService } from './base-http.service';

/**
 * NOTE: DO NOT USE THIS SERVICE DIRECTLY IN ANY COMPONENT. USE THE CORRESPONDING DATA ACCESS SERVICE.
 */
@Injectable()
export class DeviceCategoryHttpService extends BaseHttpService {

    /**
     * Fetches device categories for a given subdomain
     */
    fetch(subdomain: string, deviceCategId: string): Observable<DeviceCategory[]> {
        return zip(this.fetchDirectory(subdomain), this.fetchView(subdomain, deviceCategId)).pipe(
            map(([directories, views]) => {
                return directories.map((directory) => {
                    const view = views.find(view => view.deviceCategName === directory.deviceCategName);
                    return Object.assign(directory, view) as DeviceCategory;
                })
            })
        );
    }

    /**
     * Fetches device categories directory for a given subdomain
     */
    fetchDirectory(subdomain: string): Observable<DeviceCategoryDirectory[]> {
        const url = this.buildUrl(`device/device-category-directory/companyId/${subdomain}`);
        return this.check(
            this.httpClient.get<Response<DeviceCategoryDirectory[]>>(url),
            [StatusCode.OK, StatusCode.NOT_FOUND]
        );
    }
    
    fetchToDirectory(subdomain: string, deviceCatName: string): Observable<DeviceCategoryDirectory[]> {
        const url = this.buildUrl(`device/device-category-directory-by-part-name/companyId/${subdomain}/deviceCatName/${deviceCatName}`);
        return this.check(
            this.httpClient.get<Response<DeviceCategoryDirectory[]>>(url),
            [StatusCode.OK, StatusCode.NOT_FOUND]
        );
    }

    /**
     * Fetches device categories view for a given subdomain
     */
    fetchView(subdomain: string, deviceCategId?: string): Observable<DeviceCategoryView[]> {
        const url = this.buildUrl(`device/specific-device-category-view/companyId/${subdomain}`);
        return this.check(
            this.httpClient.get<Response<DeviceCategoryView[]>>(url),
            [StatusCode.OK, StatusCode.NOT_FOUND]
        ).pipe(
            //Addition normalisation needed since this endpont returns a single object instead of an array 
            //when there is only one item
            map((categories) => Array.isArray(categories) ? categories : [categories])
        );
    }
}
