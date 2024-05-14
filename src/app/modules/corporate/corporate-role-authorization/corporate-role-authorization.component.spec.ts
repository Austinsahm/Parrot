import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRoleAuthorizationComponent } from './corporate-role-authorization.component';

describe('CorporateRoleAuthorizationComponent', () => {
  let component: CorporateRoleAuthorizationComponent;
  let fixture: ComponentFixture<CorporateRoleAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateRoleAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateRoleAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
