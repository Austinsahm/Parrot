import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDeviceFieldComponent } from './dashboard-device-field.component';

describe('DashboardDeviceFieldComponent', () => {
  let component: DashboardDeviceFieldComponent;
  let fixture: ComponentFixture<DashboardDeviceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDeviceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDeviceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
