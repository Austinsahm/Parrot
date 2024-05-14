import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListDetailsComponent } from './device-list-details.component';

describe('DeviceListDetailsComponent', () => {
  let component: DeviceListDetailsComponent;
  let fixture: ComponentFixture<DeviceListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
