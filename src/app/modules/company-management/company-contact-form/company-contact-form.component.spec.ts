import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactFormComponent } from './company-contact-form.component';

describe('CompanyContactFormComponent', () => {
  let component: CompanyContactFormComponent;
  let fixture: ComponentFixture<CompanyContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
