import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDeviceReportComponent } from './partner-device-report.component';

describe('PartnerDeviceReportComponent', () => {
  let component: PartnerDeviceReportComponent;
  let fixture: ComponentFixture<PartnerDeviceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerDeviceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDeviceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
