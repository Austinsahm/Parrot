import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFieldComponent } from './device-field.component';

describe('DeviceFieldComponent', () => {
  let component: DeviceFieldComponent;
  let fixture: ComponentFixture<DeviceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
