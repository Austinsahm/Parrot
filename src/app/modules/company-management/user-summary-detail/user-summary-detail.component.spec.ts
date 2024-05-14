import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSummaryDetailComponent } from './user-summary-detail.component';

describe('UserSummaryDetailComponent', () => {
  let component: UserSummaryDetailComponent;
  let fixture: ComponentFixture<UserSummaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSummaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
