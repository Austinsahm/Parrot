import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateViewGeolocationComponent } from './corporate-view-geolocation.component';

describe('CorporateViewGeolocationComponent', () => {
  let component: CorporateViewGeolocationComponent;
  let fixture: ComponentFixture<CorporateViewGeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateViewGeolocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateViewGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
