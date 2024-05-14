import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySummaryReportComponent } from './company-summary-report.component';

describe('CompanySummaryReportComponent', () => {
  let component: CompanySummaryReportComponent;
  let fixture: ComponentFixture<CompanySummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
