import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceLandingComponent } from './corporate-device-landing.component';

describe('CorporateDeviceLandingComponent', () => {
  let component: CorporateDeviceLandingComponent;
  let fixture: ComponentFixture<CorporateDeviceLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
