import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAssetTracingComponent } from './device-asset-tracing.component';

describe('DeviceAssetTracingComponent', () => {
  let component: DeviceAssetTracingComponent;
  let fixture: ComponentFixture<DeviceAssetTracingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAssetTracingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAssetTracingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
