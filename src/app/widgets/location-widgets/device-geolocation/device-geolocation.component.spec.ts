import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGeolocationComponent } from './device-geolocation.component';

describe('DeviceGeolocationComponent', () => {
  let component: DeviceGeolocationComponent;
  let fixture: ComponentFixture<DeviceGeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceGeolocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
