import { TestBed } from '@angular/core/testing';

import { DashboardDataAccessService } from './dashboard-data-access.service';

describe('DashboardDataAccessService', () => {
  let service: DashboardDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
