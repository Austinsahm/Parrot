import { TestBed } from '@angular/core/testing';

import { CompanyInfoResolverService } from './company-info-resolver.service';

describe('CompanyInfoResolverService', () => {
  let service: CompanyInfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyInfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
