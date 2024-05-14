import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserDetailFormComponent } from './corporate-user-detail-form.component';

describe('CorporateUserDetailFormComponent', () => {
  let component: CorporateUserDetailFormComponent;
  let fixture: ComponentFixture<CorporateUserDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
