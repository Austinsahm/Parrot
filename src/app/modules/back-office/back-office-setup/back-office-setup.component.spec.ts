import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeSetupComponent } from './back-office-setup.component';

describe('BackOfficeSetupComponent', () => {
  let component: BackOfficeSetupComponent;
  let fixture: ComponentFixture<BackOfficeSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
