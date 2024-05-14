import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutGuageChartComponent } from './donut-guage-chart.component';

describe('DonutGuageChartComponent', () => {
  let component: DonutGuageChartComponent;
  let fixture: ComponentFixture<DonutGuageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonutGuageChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutGuageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
