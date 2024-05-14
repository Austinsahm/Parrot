import { TestBed } from '@angular/core/testing';

import { DevicesStoreService } from './devices-store.service';

describe('DevicesStoreService', () => {
  let service: DevicesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
