import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBillingComponent } from './corporate-billing.component';

describe('CorporateBillingComponent', () => {
  let component: CorporateBillingComponent;
  let fixture: ComponentFixture<CorporateBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
