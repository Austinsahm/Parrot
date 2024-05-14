import { TestBed } from '@angular/core/testing';

import { DeviceNetworkHttpService } from './device-network-http.service';

describe('DeviceNetworkHttpService', () => {
  let service: DeviceNetworkHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceNetworkHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
