import { TestBed } from '@angular/core/testing';

import { CompanyBranchHttpService } from './company-branch-http.service';

describe('CompanyBranchHttpService', () => {
  let service: CompanyBranchHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyBranchHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
