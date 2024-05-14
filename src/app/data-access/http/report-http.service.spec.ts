import { TestBed } from '@angular/core/testing';

import { ReportHttpService } from './report-http.service';

describe('ReportHttpService', () => {
  let service: ReportHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
