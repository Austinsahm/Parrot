import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeManufacturerDeviceTypesComponent } from './back-office-manufacturer-device-types.component';

describe('BackOfficeManufacturerDeviceTypesComponent', () => {
  let component: BackOfficeManufacturerDeviceTypesComponent;
  let fixture: ComponentFixture<BackOfficeManufacturerDeviceTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeManufacturerDeviceTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeManufacturerDeviceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
