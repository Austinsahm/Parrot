import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyParametersComponent } from './company-parameters.component';

describe('CompanyParametersComponent', () => {
  let component: CompanyParametersComponent;
  let fixture: ComponentFixture<CompanyParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
