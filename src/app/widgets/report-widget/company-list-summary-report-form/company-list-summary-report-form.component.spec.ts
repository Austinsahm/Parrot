import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListSummaryReportFormComponent } from './company-list-summary-report-form.component';

describe('CompanyListSummaryReportFormComponent', () => {
  let component: CompanyListSummaryReportFormComponent;
  let fixture: ComponentFixture<CompanyListSummaryReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListSummaryReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListSummaryReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
