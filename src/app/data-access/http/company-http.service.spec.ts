import { TestBed } from '@angular/core/testing';

import { CompanyHttpService } from './company-http.service';

describe('CompanyHttpService', () => {
  let service: CompanyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
