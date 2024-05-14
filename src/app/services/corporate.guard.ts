import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from "@angular/router";
import { Observable, of, zip } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { CompanyTypeCode } from "../data-access/models/company.model";
import { Domain } from "../data-access/models/domain.model";
import { SessionStorageService } from "./session-storage.service";
import { UserSessionInformation } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class CorporateGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly session: SessionStorageService,
    private readonly router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this._resolve().pipe(
      map(([domain, user]) => this._isCorporate(domain, user))
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._resolve().pipe(
      concatMap(([domain, user]) => {
        if (this._isCorporate(domain, user)) {
          return of(true);
        }
        return this.router.navigate(["/login"]);
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._resolve().pipe(
      concatMap(([domain, user]) => {
        
        if (this._isCorporate(domain, user)) {
          return of(true);
        }
        return this.router.navigate(["/login"]);
      })
    );
  }

  private _isCorporate(domain: Domain, user: UserSessionInformation): boolean {
    if (!domain?.companyType || !user?.companyTypeName) {
      return false;
    }
    const types = [CompanyTypeCode.CORPORATE, CompanyTypeCode.INDIVIDUAL];
    return (
      types.includes(domain.companyType) &&
      types.includes(user.companyTypeName as CompanyTypeCode)
    );
  }

  private _resolve(): Observable<[Domain, UserSessionInformation]> {
    return zip(this.session.getDomain(), this.session.getUser());
  }
}
