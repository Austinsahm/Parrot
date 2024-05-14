import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleFieldComponent } from './user-role-field.component';

describe('UserRoleFieldComponent', () => {
  let component: UserRoleFieldComponent;
  let fixture: ComponentFixture<UserRoleFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
