import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillingReportFormComponent } from './company-billing-report-form.component';

describe('CompanyBillingReportFormComponent', () => {
  let component: CompanyBillingReportFormComponent;
  let fixture: ComponentFixture<CompanyBillingReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBillingReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBillingReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
