import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSmartHomeDevicesComponent } from './corporate-smart-home-devices.component';

describe('CorporateSmartHomeDevicesComponent', () => {
  let component: CorporateSmartHomeDevicesComponent;
  let fixture: ComponentFixture<CorporateSmartHomeDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateSmartHomeDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSmartHomeDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
