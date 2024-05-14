import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatePasswordChangeComponent } from './corporate-password-change.component';

describe('CorporatePasswordChangeComponent', () => {
  let component: CorporatePasswordChangeComponent;
  let fixture: ComponentFixture<CorporatePasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatePasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatePasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
