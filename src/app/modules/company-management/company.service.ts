import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { UserInfoService } from "src/app/services/user-info.service";
import { Response } from "src/app/data-access/models/http.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CompanyService {
  apiEndpoint: string;
  userId: string;

  constructor(
    private http: HttpClient,
    private userInfoService: UserInfoService
  ) {
    this.apiEndpoint = environment.apiServerEndpoint;
    this.userId = userInfoService.getUserInfo()?.userId;
  }

  getCompanyList(parentId: any): Observable<any> {
    return this.http.get(
      `${this.apiEndpoint}/company/company-list/companyId/${parentId}/userId/${this.userId}`
    );
  }

  getCompanyDetails(id: any): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/company/details/companyId/${id}`);
  }

  getState(): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/setup/states`);
  }

  getcity(stateId): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/setup/cities/${stateId}`);
  }

  getLocationList(id: any): Observable<any> {
    return this.http.get(`/assets/json/locationList.json`);
  }

  getContactList(id: any): Observable<any> {
    return this.http.get(`/assets/json/contact.json`);
  }

  getAssestType(): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/asset/asset-type`);
  }

  getCompany(id): Observable<any> {
    return this.http.get(
      `${this.apiEndpoint}/company/companies/companyId/${id}`
    );
  }

  getLocation(id): Observable<any> {
    return this.http.get(
      `${this.apiEndpoint}/company/locations/companyId/${id}`
    );
  }

  getAssetDetail(id): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/asset/asset-list/${id}`);
  }

  createcompany(reqbody): Observable<any> {
    return this.http.post(
      `${this.apiEndpoint}/company/create-company`,
      reqbody
    );
  }

  loadCompanyName(): Observable<{ companyName: string }[]> {
    return this.http
      .get<Response<{ companyName: string }[]>>(
        `${this.apiEndpoint}/company/existing-company-names`
      )
      .pipe(map((companies) => companies.response));
  }

  updateCompany(reqbody): Observable<any> {
    return this.http.put(`${this.apiEndpoint}/company/update-company`, reqbody);
  }
}
