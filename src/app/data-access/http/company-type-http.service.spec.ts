import { TestBed } from '@angular/core/testing';

import { CompanyTypeHttpService } from './company-type-http.service';

describe('CompanyTypeHttpService', () => {
  let service: CompanyTypeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyTypeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
