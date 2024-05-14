import { TestBed } from '@angular/core/testing';

import { CompanyDetailDataAccessService } from './company-detail-data-access.service';

describe('CompanyDetailDataAccessService', () => {
  let service: CompanyDetailDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDetailDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
