import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceListReportFormComponent } from './corporate-device-list-report-form.component';

describe('CorporateDeviceListReportFormComponent', () => {
  let component: CorporateDeviceListReportFormComponent;
  let fixture: ComponentFixture<CorporateDeviceListReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceListReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceListReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
