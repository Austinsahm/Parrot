import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManufacturerFieldComponent } from './device-manufacturer-field.component';

describe('DeviceManufacturerFieldComponent', () => {
  let component: DeviceManufacturerFieldComponent;
  let fixture: ComponentFixture<DeviceManufacturerFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceManufacturerFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManufacturerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
