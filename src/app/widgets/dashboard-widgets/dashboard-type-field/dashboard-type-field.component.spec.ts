import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTypeFieldComponent } from './dashboard-type-field.component';

describe('DashboardTypeFieldComponent', () => {
  let component: DashboardTypeFieldComponent;
  let fixture: ComponentFixture<DashboardTypeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTypeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTypeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
