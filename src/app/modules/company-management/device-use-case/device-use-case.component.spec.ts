import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUseCaseComponent } from './device-use-case.component';

describe('DeviceUseCaseComponent', () => {
  let component: DeviceUseCaseComponent;
  let fixture: ComponentFixture<DeviceUseCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceUseCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceUseCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
