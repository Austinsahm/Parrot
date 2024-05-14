import { TestBed } from '@angular/core/testing';

import { CorporateEventMonitoringHttpService } from './corporate-event-monitoring-http.service';

describe('CorporateEventMonitoringHttpService', () => {
  let service: CorporateEventMonitoringHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateEventMonitoringHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
