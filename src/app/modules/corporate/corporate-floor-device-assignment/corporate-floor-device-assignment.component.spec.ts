import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateFloorDeviceAssignmentComponent } from './corporate-floor-device-assignment.component';

describe('CorporateFloorDeviceAssignmentComponent', () => {
  let component: CorporateFloorDeviceAssignmentComponent;
  let fixture: ComponentFixture<CorporateFloorDeviceAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateFloorDeviceAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateFloorDeviceAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
