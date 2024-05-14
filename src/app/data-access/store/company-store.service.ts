import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { CompanyDataAccessService } from "../company-data-access.service";
import { Company } from "../models/company.model";
import { searchByField } from "../utilities/collection.util";

@Injectable({
  providedIn: "root",
})
export class CompanyStoreService {
  private companies = new BehaviorSubject<Company[]>([]);

  readonly companies$ = this.companies.asObservable();

  constructor(
    private companyDataAccessor: CompanyDataAccessService,
    private errMsgService: ErrorMessageService
  ) {}

  companyList(subdomain: string, reload?: boolean) {
    if (this.companies.getValue().length === 0 || reload) {
      this.companyDataAccessor
        .getAccessor(subdomain)
        .fetch()
        .pipe(
          catchError((err) => {
            if (!err.status) {
              this.errMsgService.errorExist("You're probably offline");
            } else this.errMsgService.errorExist("Unknown Error occured");
            return of([]);
          }),
          tap((companies) => this.companies.next(companies))
        )
        .subscribe({ error: () => {} });
    }
  }

  searchCompany(keywords: string): Observable<Company[]> {
    return this.companies.pipe(
      map((companies) =>
        searchByField(companies, (company) => company.companyName, keywords)
      )
    );
  }
}
