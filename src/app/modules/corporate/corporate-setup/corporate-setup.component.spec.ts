import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSetupComponent } from './corporate-setup.component';

describe('CorporateSetupComponent', () => {
  let component: CorporateSetupComponent;
  let fixture: ComponentFixture<CorporateSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
