import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMessgeReportComponent } from './device-messge-report.component';

describe('DeviceMessgeReportComponent', () => {
  let component: DeviceMessgeReportComponent;
  let fixture: ComponentFixture<DeviceMessgeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMessgeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMessgeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
