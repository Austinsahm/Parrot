import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOrganogramComponent } from './company-organogram.component';

describe('CompanyOrganogramComponent', () => {
  let component: CompanyOrganogramComponent;
  let fixture: ComponentFixture<CompanyOrganogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOrganogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOrganogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
