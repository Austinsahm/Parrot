import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerBillingFormComponent } from './partner-billing-form.component';

describe('PartnerBillingFormComponent', () => {
  let component: PartnerBillingFormComponent;
  let fixture: ComponentFixture<PartnerBillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerBillingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerBillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
