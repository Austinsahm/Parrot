import { TestBed } from '@angular/core/testing';

import { DeviceManufacturerTypeDataAccessService } from './device-manufacturer-type-data-access.service';

describe('DeviceManufacturerTypeDataAccessService', () => {
  let service: DeviceManufacturerTypeDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceManufacturerTypeDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
