import { TestBed } from '@angular/core/testing';

import { LocationHttpServiceService } from './location-http-service.service';

describe('LocationHttpServiceService', () => {
  let service: LocationHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
