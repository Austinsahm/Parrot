import { TestBed } from '@angular/core/testing';

import { DomainDataAccessService } from './domain-data-access.service';

describe('DomainDataAccessService', () => {
  let service: DomainDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
