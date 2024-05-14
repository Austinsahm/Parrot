import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyReportComponent } from './corporate-company-report.component';

describe('CorporateCompanyReportComponent', () => {
  let component: CorporateCompanyReportComponent;
  let fixture: ComponentFixture<CorporateCompanyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
