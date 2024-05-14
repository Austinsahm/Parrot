import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserGroupsDetailsComponent } from './partner-user-groups-details.component';

describe('PartnerUserGroupsDetailsComponent', () => {
  let component: PartnerUserGroupsDetailsComponent;
  let fixture: ComponentFixture<PartnerUserGroupsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerUserGroupsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerUserGroupsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
