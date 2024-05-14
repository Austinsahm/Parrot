import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDashboardNewComponent } from './corporate-dashboard-new.component';

describe('CorporateDashboardNewComponent', () => {
  let component: CorporateDashboardNewComponent;
  let fixture: ComponentFixture<CorporateDashboardNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDashboardNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDashboardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
