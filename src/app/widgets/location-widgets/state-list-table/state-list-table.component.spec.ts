import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateListTableComponent } from './state-list-table.component';

describe('StateListTableComponent', () => {
  let component: StateListTableComponent;
  let fixture: ComponentFixture<StateListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
