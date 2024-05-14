import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLocationDetailComponent } from './company-location-detail.component';

describe('CompanyLocationDetailComponent', () => {
  let component: CompanyLocationDetailComponent;
  let fixture: ComponentFixture<CompanyLocationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLocationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
