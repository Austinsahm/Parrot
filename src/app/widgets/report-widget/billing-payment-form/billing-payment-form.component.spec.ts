import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPaymentFormComponent } from './billing-payment-form.component';

describe('BillingPaymentFormComponent', () => {
  let component: BillingPaymentFormComponent;
  let fixture: ComponentFixture<BillingPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingPaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
