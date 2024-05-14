import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLocationNewComponent } from './company-location-new.component';

describe('CompanyLocationNewComponent', () => {
  let component: CompanyLocationNewComponent;
  let fixture: ComponentFixture<CompanyLocationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLocationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLocationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
