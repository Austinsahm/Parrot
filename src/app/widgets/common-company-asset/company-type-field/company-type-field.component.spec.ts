import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypeFieldComponent } from './company-type-field.component';

describe('CompanyTypeFieldComponent', () => {
  let component: CompanyTypeFieldComponent;
  let fixture: ComponentFixture<CompanyTypeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTypeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTypeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
