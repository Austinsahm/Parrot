import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserGroupsComponent } from './corporate-user-groups.component';

describe('CorporateUserGroupsComponent', () => {
  let component: CorporateUserGroupsComponent;
  let fixture: ComponentFixture<CorporateUserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
