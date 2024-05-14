import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserGroupDetailsComponent } from './corporate-user-group-details.component';

describe('CorporateUserGroupDetailsComponent', () => {
  let component: CorporateUserGroupDetailsComponent;
  let fixture: ComponentFixture<CorporateUserGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
