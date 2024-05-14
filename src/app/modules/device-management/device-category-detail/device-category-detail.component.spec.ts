import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryDetailComponent } from './device-category-detail.component';

describe('DeviceTypeDetailComponent', () => {
  let component: DeviceCategoryDetailComponent;
  let fixture: ComponentFixture<DeviceCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
