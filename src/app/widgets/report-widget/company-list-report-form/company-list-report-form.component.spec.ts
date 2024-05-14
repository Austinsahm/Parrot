import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListReportFormComponent } from './company-list-report-form.component';

describe('CompanyListReportFormComponent', () => {
  let component: CompanyListReportFormComponent;
  let fixture: ComponentFixture<CompanyListReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
