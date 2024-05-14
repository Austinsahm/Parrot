import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserDetailViewComponent } from './corporate-user-detail-view.component';

describe('CorporateUserDetailViewComponent', () => {
  let component: CorporateUserDetailViewComponent;
  let fixture: ComponentFixture<CorporateUserDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
