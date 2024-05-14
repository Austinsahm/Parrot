import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateGeofencingComponent } from './corporate-geofencing.component';

describe('CorporateGeofencingComponent', () => {
  let component: CorporateGeofencingComponent;
  let fixture: ComponentFixture<CorporateGeofencingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateGeofencingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateGeofencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
