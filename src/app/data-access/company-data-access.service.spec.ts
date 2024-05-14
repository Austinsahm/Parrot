import { TestBed } from '@angular/core/testing';

import { CompanyDataAccessService } from './company-data-access.service';

describe('CompanyDataAccessService', () => {
  let service: CompanyDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
