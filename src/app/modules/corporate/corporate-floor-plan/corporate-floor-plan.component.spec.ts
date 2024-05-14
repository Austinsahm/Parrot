import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateFloorPlanComponent } from './corporate-floor-plan.component';

describe('CorporateFloorPlanComponent', () => {
  let component: CorporateFloorPlanComponent;
  let fixture: ComponentFixture<CorporateFloorPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateFloorPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateFloorPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
