import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManufacturerTypeFieldComponent } from './device-manufacturer-type-field.component';

describe('DeviceManufacturerTypeFieldComponent', () => {
  let component: DeviceManufacturerTypeFieldComponent;
  let fixture: ComponentFixture<DeviceManufacturerTypeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceManufacturerTypeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManufacturerTypeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
