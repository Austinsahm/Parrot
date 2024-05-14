import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRoleFieldComponent } from './company-role-field.component';

describe('CompanyRoleFieldComponent', () => {
  let component: CompanyRoleFieldComponent;
  let fixture: ComponentFixture<CompanyRoleFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRoleFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRoleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
