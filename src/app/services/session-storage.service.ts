import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { BehaviorSubject, Observable, of, zip } from "rxjs";
import { concatMap, finalize, map, tap } from "rxjs/operators";
import { DomainHttpService } from "../data-access/http/domain-http.service";
import { Domain } from "../data-access/models/domain.model";
import {
  CorporatePermissionCategory,
  PartnerPermissionCategory,
} from "../data-access/models/role-authorization.model";
import { CompanyInfoService } from "./company-info.service";
import { UserInfoService } from "./user-info.service";
import { UserSessionInformation } from "./user.service";

const DOMAIN_SESSION_FIELD = "domain";
const USER_SESSION_FIELD = "user";
const USER_PERMISSION_FIELD = "permission";

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  private readonly _loggedIn = new BehaviorSubject<boolean>(false);
  private readonly _domain = new BehaviorSubject<Domain>(null);
  private readonly _user = new BehaviorSubject<UserSessionInformation>(null);

  get loggedIn$(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }

  get domain$(): Observable<Domain> {
    return this._domain.asObservable();
  }

  get user$(): Observable<UserSessionInformation> {
    return this._user.asObservable();
  }

  constructor(
    private readonly storage: StorageMap,
    private readonly domainService: DomainHttpService,
    private companyInfo: CompanyInfoService,
    private readonly userInfoService: UserInfoService
  ) {
    this._syncLoggedInState();
  }

  /**
   * Gets subdomain from browser's URL
   */
  private _readSubdomain(): string {
    return window.location.hostname.split(".").shift();
  }

  /**
   * Gets domain entry from storage
   */
  getDomain(): Observable<Domain> {
    return this._readDomain()
      .pipe(
        concatMap((domain) => {
          if (domain?.companyId) {
            return of(domain);
          }
          return this.domainService.find(this._readSubdomain()).pipe(
            concatMap((domain) => {
              return this.setDomain(domain).pipe(map(() => domain));
            })
          );
        })
      )
      .pipe(
        finalize(() => {
          this._syncLoggedInState();
        })
      );
  }

  /**
   * Sets domain entry in storage
   * @param domain
   */
  setDomain(domain: Domain) {
    return this.storage.set(DOMAIN_SESSION_FIELD, domain).pipe(
      tap(() => this._domain.next(domain)),
      finalize(() => this._syncLoggedInState())
    );
  }

  /**
   * Reads user entry from storage
   */
  getUser(): Observable<UserSessionInformation> {
    return this._readUser().pipe(finalize(() => this._syncLoggedInState()));
  }

  /**
   * Sets or initializes use entry in storage
   * @param user
   */
  setUser(user: UserSessionInformation) {
    return this.storage.set(USER_SESSION_FIELD, user).pipe(
      tap(() => {
        this._user.next(user);
      }),
      finalize(() => this._syncLoggedInState())
    );
  }

  /**
   * Deletes user entry from storage
   */
  deleteUser() {
    return this.storage.delete(USER_SESSION_FIELD).pipe(
      tap(() => this._user.next(null)),
      finalize(() => this._syncLoggedInState())
    );
  }

  /**
   * Deletes a domain entry from storage
   */
  deleteDomain() {
    return this.storage.delete(DOMAIN_SESSION_FIELD).pipe(
      tap(() => this._domain.next(null)),
      finalize(() => this._syncLoggedInState())
    );
  }

  deleteStorage() {
    return this.storage.clear(); //.pipe(finalize(() => this._syncLoggedInState()));
  }

  /**
   * Reads value for a given token/key from storage
   * @param key
   * @param defaultValue
   */
  private _read<T>(key: string, defaultValue?: T): Observable<T> {
    return this.storage.get(key).pipe(map((value: T) => value || defaultValue));
  }

  /**
   * Reads domain details from storage
   */
  private _readDomain(): Observable<Domain> {
    return this._read<Domain>(DOMAIN_SESSION_FIELD, {} as Domain);
  }

  /**
   * Reads user details from storage
   */
  private _readUser(): Observable<UserSessionInformation> {
    return this._read<UserSessionInformation>(
      USER_SESSION_FIELD,
      {} as UserSessionInformation
    );
  }

  private _readPermission(): Observable<CorporatePermissionCategory> {
    return this._read<CorporatePermissionCategory>(
      USER_PERMISSION_FIELD,
      {} as CorporatePermissionCategory
    );
  }

  private _readPartnerPermission(): Observable<PartnerPermissionCategory> {
    return this._read<PartnerPermissionCategory>(
      USER_PERMISSION_FIELD,
      {} as PartnerPermissionCategory
    );
  }

  /**
   * Syncs login state
   */
  private _syncLoggedInState(): void {
    zip(this._readDomain(), this._readUser())
      .pipe(
        map(([domain, user]) => {
          const userValue = user?.loginId ? user : null;
          const domainValue = domain?.companyId ? domain : null;

          this._domain.next(domainValue);
          this._user.next(userValue);
          this.companyInfo.setCompanyInfo(domainValue);
          this.userInfoService.setUserInfo(userValue);

          return domainValue && userValue ? true : false;
        })
      )
      .subscribe((value) => this._loggedIn.next(value));
  }

  setPermission(
    permissions: CorporatePermissionCategory | PartnerPermissionCategory
  ) {
    return this.storage
      .set(USER_PERMISSION_FIELD, permissions)
      .pipe(finalize(() => this._syncLoggedInState()));
  }

  deletePermission() {
    return this.storage
      .delete(USER_PERMISSION_FIELD)
      .pipe(finalize(() => this._syncLoggedInState()));
  }

  readPermission(): Observable<CorporatePermissionCategory> {
    return this._readPermission().pipe(
      finalize(() => this._syncLoggedInState())
    );
  }

  partnerReadPermission(): Observable<PartnerPermissionCategory> {
    return this._readPartnerPermission().pipe(
      finalize(() => this._syncLoggedInState())
    );
  }
}
