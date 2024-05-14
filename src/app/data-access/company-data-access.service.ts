import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AbstractDataAccessService, DataAccessKey } from './abstract-data-access.service';
import { CompanyHttpService } from './http/company-http.service';
import { Company, CompanyFormData } from './models/company.model';
import { ExceptionBag } from './models/http.model';
import { searchByField } from './utilities/collection.util';

export class CompanyDataAccessor extends AbstractDataAccessService<Company> {

    private readonly _source$: Observable<Company[]>;

    constructor(private readonly subdomain: string, private readonly backend: CompanyHttpService) {
        super([]);

        this._source$ = this.backend.fetch(this.subdomain).pipe(shareReplay(1));
    }

    protected getKey(entry: Company): DataAccessKey {
        return entry.companyId;
    }

    /**
     * Creates a new company for a given subdomain
     * @param subdomain 
     * @param details 
     */
    create(subdomain: string, details: CompanyFormData): Observable<Company> {
        return this.backend.create(subdomain, details);
    }

    /**
     * Fetches a number of companies for a given subdomain
     */
    fetch(): Observable<Company[]> {
        if (this.values.length) {
            return of(this.values);
        }

        return this._source$.pipe(tap((companies) => {
            this.setValues(...companies);
        }));
    }

    /**
     * Finds a company by name
     * @param companyName 
     */
    findByName(companyName: string): Observable<Company> {
        return this.fetch().pipe(
            map((companies) => {
                const company = companies.find(company => company.companyName === companyName);
                if (!company) {
                    throw ExceptionBag.NOT_FOUND;
                }
                return company;
            })
        );
    }

    /**
    * Finds a company by Id
    * @param companyId 
    */
    findById(companyId: string): Observable<Company> {
        return this.fetch().pipe(
            map((companies) => {
                const company = companies.find(company => company.companyId === companyId);
                if (!company) {
                    throw ExceptionBag.NOT_FOUND;
                }
                return company;
            })
        );
    }

    /**
     * Searches for companies whose names match the given keywords
     * @param keywords 
     */
    search(keywords: string) {
        const source$ = this.fetch();

        if (!keywords) {
            return source$;
        }
        return source$.pipe(map((companies) => {
            return searchByField(companies, (company) => company.companyName, keywords);
        }));
    }
}

@Injectable()
export class CompanyDataAccessService {

    private readonly _mappings = new Map<string, CompanyDataAccessor>();

    constructor(private readonly backend: CompanyHttpService) { }

    /**
     * Returns company data accessor for given subdomain
     * @param subdomain 
     */
    getAccessor(subdomain: string): CompanyDataAccessor {
        if (!this._mappings.has(subdomain)) {
            this._mappings.set(subdomain, new CompanyDataAccessor(subdomain, this.backend));
        }

        return new CompanyDataAccessor(subdomain, this.backend);
    }

    destroyAccessor(): void {
        this._mappings.clear();
    }
}
