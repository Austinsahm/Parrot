import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillingFormComponent } from './company-billing-form.component';

describe('CompanyBillingFormComponent', () => {
  let component: CompanyBillingFormComponent;
  let fixture: ComponentFixture<CompanyBillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyBillingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
