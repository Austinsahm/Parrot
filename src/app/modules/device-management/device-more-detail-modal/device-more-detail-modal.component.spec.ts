import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMoreDetailModalComponent } from './device-more-detail-modal.component';

describe('DeviceMoreDetailModalComponent', () => {
  let component: DeviceMoreDetailModalComponent;
  let fixture: ComponentFixture<DeviceMoreDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMoreDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMoreDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
