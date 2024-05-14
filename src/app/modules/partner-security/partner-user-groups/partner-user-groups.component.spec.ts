import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserGroupsComponent } from './partner-user-groups.component';

describe('PartnerUserGroupsComponent', () => {
  let component: PartnerUserGroupsComponent;
  let fixture: ComponentFixture<PartnerUserGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerUserGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
