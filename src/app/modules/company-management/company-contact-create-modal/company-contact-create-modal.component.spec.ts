import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactCreateModalComponent } from './company-contact-create-modal.component';

describe('CompanyContactCreateModalComponent', () => {
  let component: CompanyContactCreateModalComponent;
  let fixture: ComponentFixture<CompanyContactCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyContactCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContactCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
