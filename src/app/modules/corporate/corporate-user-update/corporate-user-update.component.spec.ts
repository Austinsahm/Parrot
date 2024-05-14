import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserUpdateComponent } from './corporate-user-update.component';

describe('CorporateUserUpdateComponent', () => {
  let component: CorporateUserUpdateComponent;
  let fixture: ComponentFixture<CorporateUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
