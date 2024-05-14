import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLocationDetailComponent } from './corporate-location-detail.component';

describe('CorporateLocationDetailComponent', () => {
  let component: CorporateLocationDetailComponent;
  let fixture: ComponentFixture<CorporateLocationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateLocationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
