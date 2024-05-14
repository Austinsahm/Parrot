import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReportComponent } from './device-report.component';

describe('DeviceReportComponent', () => {
  let component: DeviceReportComponent;
  let fixture: ComponentFixture<DeviceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
