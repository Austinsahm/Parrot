import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListTableFormatComponent } from './company-list-table-format.component';

describe('CompanyListTableFormatComponent', () => {
  let component: CompanyListTableFormatComponent;
  let fixture: ComponentFixture<CompanyListTableFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyListTableFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListTableFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
