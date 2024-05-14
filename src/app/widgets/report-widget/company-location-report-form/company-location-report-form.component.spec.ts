import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLocationReportFormComponent } from './company-location-report-form.component';

describe('CompanyLocationReportFormComponent', () => {
  let component: CompanyLocationReportFormComponent;
  let fixture: ComponentFixture<CompanyLocationReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLocationReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLocationReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
