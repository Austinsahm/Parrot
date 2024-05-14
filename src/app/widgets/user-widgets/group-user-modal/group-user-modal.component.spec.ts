import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUserModalComponent } from './group-user-modal.component';

describe('GroupUserModalComponent', () => {
  let component: GroupUserModalComponent;
  let fixture: ComponentFixture<GroupUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
