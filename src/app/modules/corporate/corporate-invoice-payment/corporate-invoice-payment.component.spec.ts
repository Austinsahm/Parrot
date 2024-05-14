import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateInvoicePaymentComponent } from './corporate-invoice-payment.component';

describe('CorporateInvoicePaymentComponent', () => {
  let component: CorporateInvoicePaymentComponent;
  let fixture: ComponentFixture<CorporateInvoicePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateInvoicePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateInvoicePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
