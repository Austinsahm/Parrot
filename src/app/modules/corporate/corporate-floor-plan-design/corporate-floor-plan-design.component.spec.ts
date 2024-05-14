import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateFloorPlanDesignComponent } from './corporate-floor-plan-design.component';

describe('CorporateFloorPlanDesignComponent', () => {
  let component: CorporateFloorPlanDesignComponent;
  let fixture: ComponentFixture<CorporateFloorPlanDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateFloorPlanDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateFloorPlanDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
