import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceListReportViewerComponent } from './corporate-device-list-report-viewer.component';

describe('CorporateDeviceListReportViewerComponent', () => {
  let component: CorporateDeviceListReportViewerComponent;
  let fixture: ComponentFixture<CorporateDeviceListReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceListReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceListReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
