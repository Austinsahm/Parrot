import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateGeofencingAlertComponent } from './corporate-geofencing-alert.component';

describe('CorporateGeofencingAlertComponent', () => {
  let component: CorporateGeofencingAlertComponent;
  let fixture: ComponentFixture<CorporateGeofencingAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateGeofencingAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateGeofencingAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
