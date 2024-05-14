import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillingReportViewerComponent } from './company-billing-report-viewer.component';

describe('CompanyBillingReportViewerComponent', () => {
  let component: CompanyBillingReportViewerComponent;
  let fixture: ComponentFixture<CompanyBillingReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBillingReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBillingReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
