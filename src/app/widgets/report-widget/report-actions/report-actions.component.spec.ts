import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportActionsComponent } from './report-actions.component';

describe('ReportActionsComponent', () => {
  let component: ReportActionsComponent;
  let fixture: ComponentFixture<ReportActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
