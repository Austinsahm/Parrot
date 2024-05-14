import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDeviceReportFormComponent } from './partner-device-report-form.component';

describe('PartnerDeviceReportFormComponent', () => {
  let component: PartnerDeviceReportFormComponent;
  let fixture: ComponentFixture<PartnerDeviceReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerDeviceReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDeviceReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
