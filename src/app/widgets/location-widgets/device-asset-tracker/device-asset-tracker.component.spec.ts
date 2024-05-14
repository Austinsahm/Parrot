import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAssetTrackerComponent } from './device-asset-tracker.component';

describe('DeviceAssetTrackerComponent', () => {
  let component: DeviceAssetTrackerComponent;
  let fixture: ComponentFixture<DeviceAssetTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAssetTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAssetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
