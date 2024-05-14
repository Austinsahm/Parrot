import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import { LocationDevice } from "../models/device.model";
import { Response } from "../models/http.model";
import { CorporateLocation, LocationFormData } from "../models/location.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable({
  providedIn: "root",
})
export class LocationHttpServiceService extends BaseHttpService {
  userId: string;

  constructor(
    protected readonly httpClient: HttpClient,
    private userInfoService: UserInfoService,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
  }

  /**
   * Fetches all available devices for the given subdomain
   * @param subdomain
   */
  fetch(subdomain: string): Observable<CorporateLocation[]> {
    const url = this.buildUrl(
      `location/location-directory/companyId/${subdomain}/statusId/A`
    );
    return this.check(this.httpClient.get<Response<CorporateLocation[]>>(url));
  }

  create(formData: LocationFormData[]): Observable<any> {
    const url = this.buildUrl(`location/save-location`);
    return this.checkWrite(this.httpClient.post<Response<any>>(url, formData));
  }

  update(formData: LocationFormData[]): Observable<any> {
    const url = this.buildUrl(`location/update-location`);
    return this.checkWrite(this.httpClient.put<Response<any>>(url, formData));
  }

  locationDevices(
    locationId: string,
    userId?: string
  ): Observable<LocationDevice[]> {
    const url = this.buildUrl(
      `location/location-subform/locationId/${locationId}/userId/${this.userId}`
    );
    return this.check(this.httpClient.get<Response<LocationDevice[]>>(url));
  }

  getLocation(
    locationId: string,
    companyId: string
  ): Observable<CorporateLocation[]> {
    const url = this.buildUrl(
      `location/specific-location/companyId/${companyId}/statusId/A/locationId/${locationId}`
    );
    return this.check(this.httpClient.get<Response<CorporateLocation[]>>(url));
  }
}
