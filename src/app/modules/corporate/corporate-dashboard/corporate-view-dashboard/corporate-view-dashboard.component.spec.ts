import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateViewDashboardComponent } from './corporate-view-dashboard.component';

describe('CorporateViewDashboardComponent', () => {
  let component: CorporateViewDashboardComponent;
  let fixture: ComponentFixture<CorporateViewDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateViewDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateViewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
