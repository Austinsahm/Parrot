import { TestBed } from '@angular/core/testing';

import { DeviceManufacturerTypeHttpService } from './device-manufacturer-type-http.service';

describe('DeviceManufacturerTypeHttpService', () => {
  let service: DeviceManufacturerTypeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceManufacturerTypeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
