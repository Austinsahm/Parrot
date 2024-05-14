import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceMessageReportComponent } from './corporate-device-message-report.component';

describe('CorporateDeviceMessageReportComponent', () => {
  let component: CorporateDeviceMessageReportComponent;
  let fixture: ComponentFixture<CorporateDeviceMessageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceMessageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceMessageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
