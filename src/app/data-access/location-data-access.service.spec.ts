import { TestBed } from '@angular/core/testing';

import { LocationDataAccessService } from './location-data-access.service';

describe('LocationDataAccessService', () => {
  let service: LocationDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
