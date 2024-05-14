import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceDeviceGeofenceComponent } from './trace-device-geofence.component';

describe('TraceDeviceGeofenceComponent', () => {
  let component: TraceDeviceGeofenceComponent;
  let fixture: ComponentFixture<TraceDeviceGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceDeviceGeofenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceDeviceGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
