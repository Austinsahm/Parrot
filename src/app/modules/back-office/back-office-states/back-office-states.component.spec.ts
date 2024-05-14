import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeStatesComponent } from './back-office-states.component';

describe('BackOfficeStatesComponent', () => {
  let component: BackOfficeStatesComponent;
  let fixture: ComponentFixture<BackOfficeStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
