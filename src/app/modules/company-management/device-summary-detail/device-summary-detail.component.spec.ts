import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSummaryDetailComponent } from './device-summary-detail.component';

describe('DeviceSummaryDetailComponent', () => {
  let component: DeviceSummaryDetailComponent;
  let fixture: ComponentFixture<DeviceSummaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSummaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
