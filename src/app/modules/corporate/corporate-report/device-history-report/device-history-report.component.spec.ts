import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHistoryReportComponent } from './device-history-report.component';

describe('DeviceHistoryReportComponent', () => {
  let component: DeviceHistoryReportComponent;
  let fixture: ComponentFixture<DeviceHistoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHistoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHistoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
