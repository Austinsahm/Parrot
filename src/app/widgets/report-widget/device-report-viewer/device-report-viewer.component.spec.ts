import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceReportViewerComponent } from './device-report-viewer.component';

describe('DeviceReportViewerComponent', () => {
  let component: DeviceReportViewerComponent;
  let fixture: ComponentFixture<DeviceReportViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceReportViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceReportViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
