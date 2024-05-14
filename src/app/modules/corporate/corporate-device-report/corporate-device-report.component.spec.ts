import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceReportComponent } from './corporate-device-report.component';

describe('CorporateDeviceReportComponent', () => {
  let component: CorporateDeviceReportComponent;
  let fixture: ComponentFixture<CorporateDeviceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
