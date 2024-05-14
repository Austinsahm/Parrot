import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillingReportComponent } from './company-billing-report.component';

describe('CompanyBillingReportComponent', () => {
  let component: CompanyBillingReportComponent;
  let fixture: ComponentFixture<CompanyBillingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBillingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBillingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
