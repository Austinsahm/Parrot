import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateFloorPlanDesignPageComponent } from './corporate-floor-plan-design-page.component';

describe('CorporateFloorPlanDesignPageComponent', () => {
  let component: CorporateFloorPlanDesignPageComponent;
  let fixture: ComponentFixture<CorporateFloorPlanDesignPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateFloorPlanDesignPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateFloorPlanDesignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
