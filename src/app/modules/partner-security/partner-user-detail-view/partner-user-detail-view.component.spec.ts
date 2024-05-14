import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserDetailViewComponent } from './partner-user-detail-view.component';

describe('PartnerUserDetailViewComponent', () => {
  let component: PartnerUserDetailViewComponent;
  let fixture: ComponentFixture<PartnerUserDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerUserDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerUserDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
