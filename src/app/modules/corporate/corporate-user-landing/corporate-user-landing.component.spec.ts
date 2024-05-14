import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserLandingComponent } from './corporate-user-landing.component';

describe('CorporateUserLandingComponent', () => {
  let component: CorporateUserLandingComponent;
  let fixture: ComponentFixture<CorporateUserLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
