import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCountriesComponent } from './back-office-countries.component';

describe('BackOfficeCountriesComponent', () => {
  let component: BackOfficeCountriesComponent;
  let fixture: ComponentFixture<BackOfficeCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
