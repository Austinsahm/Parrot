import { TestBed } from '@angular/core/testing';

import { DeviceManufacturerHttpService } from './device-manufacturer-http.service';

describe('DeviceManufacturerHttpService', () => {
  let service: DeviceManufacturerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceManufacturerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
