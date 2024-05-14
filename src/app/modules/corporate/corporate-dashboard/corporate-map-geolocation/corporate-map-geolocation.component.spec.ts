import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMapGeolocationComponent } from './corporate-map-geolocation.component';

describe('CorporateMapGeolocationComponent', () => {
  let component: CorporateMapGeolocationComponent;
  let fixture: ComponentFixture<CorporateMapGeolocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMapGeolocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMapGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
