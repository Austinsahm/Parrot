import { TestBed } from '@angular/core/testing';

import { UserDeviceOverviewStoreService } from './user-device-overview-store.service';

describe('UserDeviceOverviewStoreService', () => {
  let service: UserDeviceOverviewStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDeviceOverviewStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
