import { TestBed } from '@angular/core/testing';

import { CountryDataAccessService } from './country-data-access.service';

describe('CountryDataAccessService', () => {
  let service: CountryDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
