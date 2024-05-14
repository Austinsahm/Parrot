import { TestBed } from '@angular/core/testing';

import { DeviceManufacturerDataAccessService } from './device-manufacturer-data-access.service';

describe('DeviceManufacturerDataAccessService', () => {
  let service: DeviceManufacturerDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceManufacturerDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
