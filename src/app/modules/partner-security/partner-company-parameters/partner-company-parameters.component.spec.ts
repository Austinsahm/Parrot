import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCompanyParametersComponent } from './partner-company-parameters.component';

describe('PartnerCompanyParametersComponent', () => {
  let component: PartnerCompanyParametersComponent;
  let fixture: ComponentFixture<PartnerCompanyParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerCompanyParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCompanyParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
