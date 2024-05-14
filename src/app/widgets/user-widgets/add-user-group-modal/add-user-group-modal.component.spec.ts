import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserGroupModalComponent } from './add-user-group-modal.component';

describe('AddUserGroupModalComponent', () => {
  let component: AddUserGroupModalComponent;
  let fixture: ComponentFixture<AddUserGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
