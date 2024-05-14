import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartSingleSourceComponent } from './line-chart-single-source.component';

describe('LineChartSingleSourceComponent', () => {
  let component: LineChartSingleSourceComponent;
  let fixture: ComponentFixture<LineChartSingleSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartSingleSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartSingleSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
