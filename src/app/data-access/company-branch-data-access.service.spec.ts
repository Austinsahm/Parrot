import { TestBed } from '@angular/core/testing';

import { CompanyBranchDataAccessService } from './company-branch-data-access.service';

describe('CompanyBranchDataAccessService', () => {
  let service: CompanyBranchDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyBranchDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
