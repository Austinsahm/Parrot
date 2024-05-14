import { TestBed } from '@angular/core/testing';

import { DeviceSensorHttpService } from './device-sensor-http.service';

describe('DeviceSensorHttpService', () => {
  let service: DeviceSensorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSensorHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
