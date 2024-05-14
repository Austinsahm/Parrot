import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../models/use-case.model";
import { Response } from "../models/http.model";
import { BaseHttpService } from "./base-http.service";

@Injectable({
  providedIn: "root",
})
export class UseCaseService extends BaseHttpService {
  fetchUseCases(): Observable<UseCase[]> {
    const url = this.buildUrl(`setup/useCaseList`);
    return this.check(this.httpClient.get<Response<UseCase[]>>(url));
  }

  fetchUseCasesByCompany(companyId: string): Observable<UseCase[]> {
    const url = this.buildUrl(`device/use-case/companyId/${companyId}`);
    return this.check(this.httpClient.get<Response<UseCase[]>>(url));
  }
}
