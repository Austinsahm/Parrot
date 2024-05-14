import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryDeviceModalComponent } from './device-category-device-modal.component';

describe('DeviceCategoryDeviceModalComponent', () => {
  let component: DeviceCategoryDeviceModalComponent;
  let fixture: ComponentFixture<DeviceCategoryDeviceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCategoryDeviceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCategoryDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
