import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMessagesReportViewerComponent } from './device-messages-report-viewer.component';

describe('DeviceMessagesReportViewerComponent', () => {
  let component: DeviceMessagesReportViewerComponent;
  let fixture: ComponentFixture<DeviceMessagesReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMessagesReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMessagesReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
