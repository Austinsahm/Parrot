import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMessageReportComponent } from './device-message-report.component';

describe('DeviceMessageReportComponent', () => {
  let component: DeviceMessageReportComponent;
  let fixture: ComponentFixture<DeviceMessageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMessageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMessageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
