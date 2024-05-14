import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSummaryDetailsSettingsComponent } from './device-summary-details-settings.component';

describe('DeviceSummaryDetailsSettingsComponent', () => {
  let component: DeviceSummaryDetailsSettingsComponent;
  let fixture: ComponentFixture<DeviceSummaryDetailsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSummaryDetailsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSummaryDetailsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
