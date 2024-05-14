import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyBillingReportComponent } from './corporate-company-billing-report.component';

describe('CorporateCompanyBillingReportComponent', () => {
  let component: CorporateCompanyBillingReportComponent;
  let fixture: ComponentFixture<CorporateCompanyBillingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyBillingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyBillingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
