import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialGaugeChartComponent } from './radial-gauge-chart.component';

describe('RadialGaugeChartComponent', () => {
  let component: RadialGaugeChartComponent;
  let fixture: ComponentFixture<RadialGaugeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadialGaugeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialGaugeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
