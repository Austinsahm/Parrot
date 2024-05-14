import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateEventMonitoringComponent } from './corporate-event-monitoring.component';

describe('CorporateEventMonitoringComponent', () => {
  let component: CorporateEventMonitoringComponent;
  let fixture: ComponentFixture<CorporateEventMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateEventMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateEventMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
