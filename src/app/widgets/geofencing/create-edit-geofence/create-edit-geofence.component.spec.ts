import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGeofenceComponent } from './create-edit-geofence.component';

describe('CreateEditGeofenceComponent', () => {
  let component: CreateEditGeofenceComponent;
  let fixture: ComponentFixture<CreateEditGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditGeofenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
