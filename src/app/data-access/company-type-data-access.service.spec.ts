import { TestBed } from '@angular/core/testing';

import { CompanyTypeDataAccessService } from './company-type-data-access.service';

describe('CompanyTypeDataAccessService', () => {
  let service: CompanyTypeDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyTypeDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
