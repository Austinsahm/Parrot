import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSummaryDetailComponent } from './location-summary-detail.component';

describe('LocationSummaryDetailComponent', () => {
  let component: LocationSummaryDetailComponent;
  let fixture: ComponentFixture<LocationSummaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSummaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
