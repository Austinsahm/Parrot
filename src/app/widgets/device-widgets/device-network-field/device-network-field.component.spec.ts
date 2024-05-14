import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceNetworkFieldComponent } from './device-network-field.component';

describe('DeviceNetworkFieldComponent', () => {
  let component: DeviceNetworkFieldComponent;
  let fixture: ComponentFixture<DeviceNetworkFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceNetworkFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceNetworkFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
