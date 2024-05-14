import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSecurityComponent } from './back-office-security.component';

describe('BackOfficeSecurityComponent', () => {
  let component: BackOfficeSecurityComponent;
  let fixture: ComponentFixture<BackOfficeSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
