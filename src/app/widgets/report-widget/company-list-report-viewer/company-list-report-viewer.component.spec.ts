import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListReportViewerComponent } from './company-list-report-viewer.component';

describe('CompanyListReportViewerComponent', () => {
  let component: CompanyListReportViewerComponent;
  let fixture: ComponentFixture<CompanyListReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
