import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLastStatusComponent } from './device-last-status.component';

describe('DeviceLastStatusComponent', () => {
  let component: DeviceLastStatusComponent;
  let fixture: ComponentFixture<DeviceLastStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceLastStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLastStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
