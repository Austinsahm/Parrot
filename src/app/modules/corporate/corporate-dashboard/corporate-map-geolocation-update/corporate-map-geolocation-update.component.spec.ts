import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMapGeolocationUpdateComponent } from './corporate-map-geolocation-update.component';

describe('CorporateMapGeolocationUpdateComponent', () => {
  let component: CorporateMapGeolocationUpdateComponent;
  let fixture: ComponentFixture<CorporateMapGeolocationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMapGeolocationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMapGeolocationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
