import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySummaryReportViewerComponent } from './company-summary-report-viewer.component';

describe('CompanySummaryReportViewerComponent', () => {
  let component: CompanySummaryReportViewerComponent;
  let fixture: ComponentFixture<CompanySummaryReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySummaryReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySummaryReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
