import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceSummaryReportComponent } from './corporate-device-summary-report.component';

describe('CorporateDeviceSummaryReportComponent', () => {
  let component: CorporateDeviceSummaryReportComponent;
  let fixture: ComponentFixture<CorporateDeviceSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
