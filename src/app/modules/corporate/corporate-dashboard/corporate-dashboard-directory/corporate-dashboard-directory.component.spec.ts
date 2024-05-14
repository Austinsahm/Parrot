import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDashboardDirectoryComponent } from './corporate-dashboard-directory.component';

describe('CorporateDashboardDirectoryComponent', () => {
  let component: CorporateDashboardDirectoryComponent;
  let fixture: ComponentFixture<CorporateDashboardDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDashboardDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDashboardDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
