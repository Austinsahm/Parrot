import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryListComponent } from './device-category-list.component';

describe('DeviceTypeListComponent', () => {
  let component: DeviceCategoryListComponent;
  let fixture: ComponentFixture<DeviceCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
