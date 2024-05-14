import { TestBed } from '@angular/core/testing';

import { BillingPaymentService } from './billing-payment.service';

describe('BillingPaymentService', () => {
  let service: BillingPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
