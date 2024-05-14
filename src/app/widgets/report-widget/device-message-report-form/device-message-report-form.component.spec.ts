import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMessageReportFormComponent } from './device-message-report-form.component';

describe('DeviceMessageReportFormComponent', () => {
  let component: DeviceMessageReportFormComponent;
  let fixture: ComponentFixture<DeviceMessageReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMessageReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMessageReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
