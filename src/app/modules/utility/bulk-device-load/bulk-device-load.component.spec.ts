import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkDeviceLoadComponent } from './bulk-device-load.component';

describe('BulkDeviceLoadComponent', () => {
  let component: BulkDeviceLoadComponent;
  let fixture: ComponentFixture<BulkDeviceLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkDeviceLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkDeviceLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
