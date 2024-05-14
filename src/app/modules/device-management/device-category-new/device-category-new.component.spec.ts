import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryNewComponent } from './device-category-new.component';

describe('DeviceTypeNewComponent', () => {
  let component: DeviceCategoryNewComponent;
  let fixture: ComponentFixture<DeviceCategoryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCategoryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
