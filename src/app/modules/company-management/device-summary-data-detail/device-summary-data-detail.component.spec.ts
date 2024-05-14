import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSummaryDataDetailComponent } from './device-summary-data-detail.component';

describe('DeviceSummaryDataDetailComponent', () => {
  let component: DeviceSummaryDataDetailComponent;
  let fixture: ComponentFixture<DeviceSummaryDataDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSummaryDataDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSummaryDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
