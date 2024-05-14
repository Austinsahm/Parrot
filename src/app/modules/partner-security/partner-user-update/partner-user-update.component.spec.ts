import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserUpdateComponent } from './partner-user-update.component';

describe('PartnerUserUpdateComponent', () => {
  let component: PartnerUserUpdateComponent;
  let fixture: ComponentFixture<PartnerUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
