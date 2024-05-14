import { TestBed } from '@angular/core/testing';

import { BillingHttpService } from './billing-http.service';

describe('BillingHttpService', () => {
  let service: BillingHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
