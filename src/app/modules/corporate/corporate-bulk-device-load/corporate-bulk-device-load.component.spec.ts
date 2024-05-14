import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBulkDeviceLoadComponent } from './corporate-bulk-device-load.component';

describe('CorporateBulkDeviceLoadComponent', () => {
  let component: CorporateBulkDeviceLoadComponent;
  let fixture: ComponentFixture<CorporateBulkDeviceLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBulkDeviceLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBulkDeviceLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
