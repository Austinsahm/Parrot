import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMessageSummaryReportComponent } from './device-message-summary-report.component';

describe('DeviceMessageSummaryReportComponent', () => {
  let component: DeviceMessageSummaryReportComponent;
  let fixture: ComponentFixture<DeviceMessageSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMessageSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMessageSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
