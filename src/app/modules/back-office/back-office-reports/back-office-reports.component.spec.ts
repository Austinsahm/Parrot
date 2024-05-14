import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeReportsComponent } from './back-office-reports.component';

describe('BackOfficeReportsComponent', () => {
  let component: BackOfficeReportsComponent;
  let fixture: ComponentFixture<BackOfficeReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
