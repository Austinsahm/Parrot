import { TestBed } from '@angular/core/testing';

import { DomainHttpService } from './domain-http.service';

describe('DomainHttpService', () => {
  let service: DomainHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
