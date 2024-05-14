import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVerticalOrganogramComponent } from './company-vertical-organogram.component';

describe('CompanyVerticalOrganogramComponent', () => {
  let component: CompanyVerticalOrganogramComponent;
  let fixture: ComponentFixture<CompanyVerticalOrganogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyVerticalOrganogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyVerticalOrganogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
