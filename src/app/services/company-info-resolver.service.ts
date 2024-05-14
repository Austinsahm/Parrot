import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root",
})
export class CompanyInfoResolverService implements Resolve<any> {
  apiEndpoint: string;

  constructor(private session: SessionStorageService) {
    this.apiEndpoint = environment.apiServerEndpoint;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.session.getDomain().pipe(catchError((e) => of({})));
  }
}
