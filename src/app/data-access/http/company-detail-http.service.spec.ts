import { TestBed } from '@angular/core/testing';

import { CompanyDetailHttpService } from './company-detail-http.service';

describe('CompanyDetailHttpService', () => {
  let service: CompanyDetailHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDetailHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
