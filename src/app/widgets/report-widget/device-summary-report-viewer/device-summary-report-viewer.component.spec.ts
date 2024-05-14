import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSummaryReportViewerComponent } from './device-summary-report-viewer.component';

describe('DeviceSummaryReportViewerComponent', () => {
  let component: DeviceSummaryReportViewerComponent;
  let fixture: ComponentFixture<DeviceSummaryReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSummaryReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSummaryReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
