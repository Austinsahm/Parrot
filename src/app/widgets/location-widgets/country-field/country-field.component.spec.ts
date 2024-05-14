import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFieldComponent } from './country-field.component';

describe('CountryFieldComponent', () => {
  let component: CountryFieldComponent;
  let fixture: ComponentFixture<CountryFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
