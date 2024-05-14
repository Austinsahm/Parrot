import { TestBed } from '@angular/core/testing';

import { ReportDataAccessorService } from './report-data-accessor.service';

describe('ReportDataAccessorService', () => {
  let service: ReportDataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
