import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCountryDetailsComponent } from './back-office-country-details.component';

describe('BackOfficeCountryDetailsComponent', () => {
  let component: BackOfficeCountryDetailsComponent;
  let fixture: ComponentFixture<BackOfficeCountryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeCountryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeCountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
