import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLocationReportComponent } from './company-location-report.component';

describe('CompanyLocationReportComponent', () => {
  let component: CompanyLocationReportComponent;
  let fixture: ComponentFixture<CompanyLocationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLocationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
