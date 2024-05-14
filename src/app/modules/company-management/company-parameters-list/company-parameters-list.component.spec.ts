import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyParametersListComponent } from './company-parameters-list.component';

describe('CompanyParametersListComponent', () => {
  let component: CompanyParametersListComponent;
  let fixture: ComponentFixture<CompanyParametersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyParametersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyParametersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
