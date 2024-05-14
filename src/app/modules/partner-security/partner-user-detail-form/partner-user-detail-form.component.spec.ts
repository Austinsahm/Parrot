import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserDetailFormComponent } from './partner-user-detail-form.component';

describe('PartnerUserDetailFormComponent', () => {
  let component: PartnerUserDetailFormComponent;
  let fixture: ComponentFixture<PartnerUserDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerUserDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerUserDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
