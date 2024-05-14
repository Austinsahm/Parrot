import { TestBed } from '@angular/core/testing';

import { CityDataAccessService } from './city-data-access.service';

describe('CityDataAccessService', () => {
  let service: CityDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
