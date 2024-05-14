import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeFieldComponent } from './user-type-field.component';

describe('UserTypeFieldComponent', () => {
  let component: UserTypeFieldComponent;
  let fixture: ComponentFixture<UserTypeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
