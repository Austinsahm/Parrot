import { TestBed } from '@angular/core/testing';

import { DeviceSensorDataAccessorService } from './device-sensor-data-accessor.service';

describe('DeviceSensorDataAccessorService', () => {
  let service: DeviceSensorDataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSensorDataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
