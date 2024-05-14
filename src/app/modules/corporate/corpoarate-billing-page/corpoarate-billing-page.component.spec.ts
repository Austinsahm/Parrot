import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpoarateBillingPageComponent } from './corpoarate-billing-page.component';

describe('CorpoarateBillingPageComponent', () => {
  let component: CorpoarateBillingPageComponent;
  let fixture: ComponentFixture<CorpoarateBillingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpoarateBillingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpoarateBillingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
