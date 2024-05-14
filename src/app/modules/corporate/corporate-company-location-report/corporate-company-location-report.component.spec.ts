import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyLocationReportComponent } from './corporate-company-location-report.component';

describe('CorporateCompanyLocationReportComponent', () => {
  let component: CorporateCompanyLocationReportComponent;
  let fixture: ComponentFixture<CorporateCompanyLocationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyLocationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyLocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
