import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  CanActivateChild,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";
import { isPartnerUser } from "./utilities";

@Injectable({
  providedIn: "root",
})
export class PartnerGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private readonly session: SessionStorageService,
    private readonly router: Router
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.session.getUser().pipe(
      concatMap((user) => {
        if (isPartnerUser(user)) {
          return of(true);
        }

        return this.router.navigate(["/login"]);
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.session.getUser().pipe(map((user) => isPartnerUser(user)));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.session.getUser().pipe(
      concatMap((user) => {
        if (isPartnerUser(user)) {
          return of(true);
        }

        return this.router.navigate(["/login"]);
      })
    );
  }
}