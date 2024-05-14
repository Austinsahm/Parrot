import { TestBed } from '@angular/core/testing';

import { CorporateReportDataAccessorService } from './corporate-report-data-accessor.service';

describe('CorporateReportDataAccessorService', () => {
  let service: CorporateReportDataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateReportDataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
