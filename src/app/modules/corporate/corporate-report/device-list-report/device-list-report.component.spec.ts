import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListReportComponent } from './device-list-report.component';

describe('DeviceListReportComponent', () => {
  let component: DeviceListReportComponent;
  let fixture: ComponentFixture<DeviceListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
