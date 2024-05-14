import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCountryCreateComponent } from './back-office-country-create.component';

describe('BackOfficeCountryCreateComponent', () => {
  let component: BackOfficeCountryCreateComponent;
  let fixture: ComponentFixture<BackOfficeCountryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeCountryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeCountryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
