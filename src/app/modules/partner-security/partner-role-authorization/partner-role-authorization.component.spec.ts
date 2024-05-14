import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRoleAuthorizationComponent } from './partner-role-authorization.component';

describe('PartnerRoleAuthorizationComponent', () => {
  let component: PartnerRoleAuthorizationComponent;
  let fixture: ComponentFixture<PartnerRoleAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerRoleAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRoleAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
