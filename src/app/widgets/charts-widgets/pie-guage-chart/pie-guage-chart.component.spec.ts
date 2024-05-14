import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGuageChartComponent } from './pie-guage-chart.component';

describe('PieGuageChartComponent', () => {
  let component: PieGuageChartComponent;
  let fixture: ComponentFixture<PieGuageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieGuageChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGuageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
