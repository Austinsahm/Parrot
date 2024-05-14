import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLocationLandingComponent } from './corporate-location-landing.component';

describe('CorporateLocationLandingComponent', () => {
  let component: CorporateLocationLandingComponent;
  let fixture: ComponentFixture<CorporateLocationLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateLocationLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLocationLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
