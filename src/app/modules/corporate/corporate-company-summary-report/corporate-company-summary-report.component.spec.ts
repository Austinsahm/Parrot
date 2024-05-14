import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanySummaryReportComponent } from './corporate-company-summary-report.component';

describe('CorporateCompanySummaryReportComponent', () => {
  let component: CorporateCompanySummaryReportComponent;
  let fixture: ComponentFixture<CorporateCompanySummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanySummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanySummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
