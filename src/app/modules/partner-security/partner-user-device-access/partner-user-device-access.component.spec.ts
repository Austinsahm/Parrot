import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserDeviceAccessComponent } from './partner-user-device-access.component';

describe('PartnerUserDeviceAccessComponent', () => {
  let component: PartnerUserDeviceAccessComponent;
  let fixture: ComponentFixture<PartnerUserDeviceAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerUserDeviceAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerUserDeviceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
