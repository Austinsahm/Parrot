import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListReportFormComponent } from './device-list-report-form.component';

describe('DeviceListReportFormComponent', () => {
  let component: DeviceListReportFormComponent;
  let fixture: ComponentFixture<DeviceListReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
