import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceListSummaryReportViewerComponent } from './corporate-device-list-summary-report-viewer.component';

describe('CorporateDeviceListSummaryReportViewerComponent', () => {
  let component: CorporateDeviceListSummaryReportViewerComponent;
  let fixture: ComponentFixture<CorporateDeviceListSummaryReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceListSummaryReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceListSummaryReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
