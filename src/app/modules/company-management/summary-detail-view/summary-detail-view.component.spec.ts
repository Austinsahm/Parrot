import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDetailViewComponent } from './summary-detail-view.component';

describe('SummaryDetailViewComponent', () => {
  let component: SummaryDetailViewComponent;
  let fixture: ComponentFixture<SummaryDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
