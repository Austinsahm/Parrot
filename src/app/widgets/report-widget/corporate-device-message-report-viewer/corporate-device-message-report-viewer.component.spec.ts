import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceMessageReportViewerComponent } from './corporate-device-message-report-viewer.component';

describe('CorporateDeviceMessageReportViewerComponent', () => {
  let component: CorporateDeviceMessageReportViewerComponent;
  let fixture: ComponentFixture<CorporateDeviceMessageReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceMessageReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceMessageReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
