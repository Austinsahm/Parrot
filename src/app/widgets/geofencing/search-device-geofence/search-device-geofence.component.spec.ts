import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDeviceGeofenceComponent } from './search-device-geofence.component';

describe('SearchDeviceGeofenceComponent', () => {
  let component: SearchDeviceGeofenceComponent;
  let fixture: ComponentFixture<SearchDeviceGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDeviceGeofenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDeviceGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
