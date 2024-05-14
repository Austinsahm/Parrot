import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLocationReportViewerComponent } from './company-location-report-viewer.component';

describe('CompanyLocationReportViewerComponent', () => {
  let component: CompanyLocationReportViewerComponent;
  let fixture: ComponentFixture<CompanyLocationReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLocationReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLocationReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
