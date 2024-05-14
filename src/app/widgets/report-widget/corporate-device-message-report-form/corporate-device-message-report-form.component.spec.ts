import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceMessageReportFormComponent } from './corporate-device-message-report-form.component';

describe('CorporateDeviceMessageReportFormComponent', () => {
  let component: CorporateDeviceMessageReportFormComponent;
  let fixture: ComponentFixture<CorporateDeviceMessageReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceMessageReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceMessageReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
