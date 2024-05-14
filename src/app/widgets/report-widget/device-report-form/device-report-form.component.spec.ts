import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReportFormComponent } from './device-report-form.component';

describe('DeviceReportFormComponent', () => {
  let component: DeviceReportFormComponent;
  let fixture: ComponentFixture<DeviceReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
