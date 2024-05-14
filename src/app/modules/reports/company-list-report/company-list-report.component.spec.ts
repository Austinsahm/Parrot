import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListReportComponent } from './company-list-report.component';

describe('CompanyListReportComponent', () => {
  let component: CompanyListReportComponent;
  let fixture: ComponentFixture<CompanyListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
