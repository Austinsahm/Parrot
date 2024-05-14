import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceAlertNotficationComponent } from './corporate-device-alert-notfication.component';

describe('CorporateDeviceAlertNotficationComponent', () => {
  let component: CorporateDeviceAlertNotficationComponent;
  let fixture: ComponentFixture<CorporateDeviceAlertNotficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateDeviceAlertNotficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceAlertNotficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
