import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactUpdateModalComponent } from './company-contact-update-modal.component';

describe('CompanyContactUpdateModalComponent', () => {
  let component: CompanyContactUpdateModalComponent;
  let fixture: ComponentFixture<CompanyContactUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyContactUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContactUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
