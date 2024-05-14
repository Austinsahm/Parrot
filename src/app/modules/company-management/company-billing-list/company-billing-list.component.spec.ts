import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillingListComponent } from './company-billing-list.component';

describe('CompanyBillingListComponent', () => {
  let component: CompanyBillingListComponent;
  let fixture: ComponentFixture<CompanyBillingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyBillingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
