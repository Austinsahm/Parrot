import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserListComponent } from './corporate-user-list.component';

describe('CorporateUserListComponent', () => {
  let component: CorporateUserListComponent;
  let fixture: ComponentFixture<CorporateUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
