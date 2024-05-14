import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserDeviceAccessComponent } from './corporate-user-device-access.component';

describe('CorporateUserDeviceAccessComponent', () => {
  let component: CorporateUserDeviceAccessComponent;
  let fixture: ComponentFixture<CorporateUserDeviceAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserDeviceAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserDeviceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
