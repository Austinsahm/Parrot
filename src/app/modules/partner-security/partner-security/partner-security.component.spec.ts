import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSecurityComponent } from './partner-security.component';

describe('PartnerSecurityComponent', () => {
  let component: PartnerSecurityComponent;
  let fixture: ComponentFixture<PartnerSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
