import { TestBed } from '@angular/core/testing';

import { DeviceNetworkDataAccessService } from './device-network-data-access.service';

describe('DeviceNetworkDataAccessService', () => {
  let service: DeviceNetworkDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceNetworkDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
