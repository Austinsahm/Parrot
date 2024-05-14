import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerChangePasswordComponent } from './partner-change-password.component';

describe('PartnerChangePasswordComponent', () => {
  let component: PartnerChangePasswordComponent;
  let fixture: ComponentFixture<PartnerChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
