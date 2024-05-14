import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDashboardUpdateComponent } from './corporate-dashboard-update.component';

describe('CorporateDashboardUpdateComponent', () => {
  let component: CorporateDashboardUpdateComponent;
  let fixture: ComponentFixture<CorporateDashboardUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDashboardUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDashboardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
