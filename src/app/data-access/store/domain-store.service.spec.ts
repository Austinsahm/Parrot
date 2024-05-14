import { TestBed } from '@angular/core/testing';

import { DomainStoreService } from './domain-store.service';

describe('DomainStoreService', () => {
  let service: DomainStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
