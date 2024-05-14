import { TestBed } from '@angular/core/testing';

import { CorporateReportHttpService } from './corporate-report-http.service';

describe('CorporateReportHttpService', () => {
  let service: CorporateReportHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateReportHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
