import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListReportViewerComponent } from './device-list-report-viewer.component';

describe('DeviceListReportViewerComponent', () => {
  let component: DeviceListReportViewerComponent;
  let fixture: ComponentFixture<DeviceListReportViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListReportViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
