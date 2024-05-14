import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLandingComponent } from './corporate-landing.component';

describe('CorporateLandingComponent', () => {
  let component: CorporateLandingComponent;
  let fixture: ComponentFixture<CorporateLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
