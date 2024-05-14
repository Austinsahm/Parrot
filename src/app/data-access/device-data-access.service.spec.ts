import { TestBed } from '@angular/core/testing';

import { DeviceDataAccessService } from './device-data-access.service';

describe('DeviceDataAccessService', () => {
  let service: DeviceDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
