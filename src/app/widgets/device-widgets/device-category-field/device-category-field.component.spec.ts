import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryFieldComponent } from './device-category-field.component';

describe('DeviceCategoryFieldComponent', () => {
  let component: DeviceCategoryFieldComponent;
  let fixture: ComponentFixture<DeviceCategoryFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCategoryFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCategoryFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
