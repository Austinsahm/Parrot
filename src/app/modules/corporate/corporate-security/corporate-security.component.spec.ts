import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSecurityComponent } from './corporate-security.component';

describe('CorporateSecurityComponent', () => {
  let component: CorporateSecurityComponent;
  let fixture: ComponentFixture<CorporateSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
