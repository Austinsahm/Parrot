import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSummaryReportFormComponent } from './device-summary-report-form.component';

describe('DeviceSummaryReportFormComponent', () => {
  let component: DeviceSummaryReportFormComponent;
  let fixture: ComponentFixture<DeviceSummaryReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSummaryReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSummaryReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
