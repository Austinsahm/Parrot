import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTracingComponent } from './device-tracing.component';

describe('DeviceTracingComponent', () => {
  let component: DeviceTracingComponent;
  let fixture: ComponentFixture<DeviceTracingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTracingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTracingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
