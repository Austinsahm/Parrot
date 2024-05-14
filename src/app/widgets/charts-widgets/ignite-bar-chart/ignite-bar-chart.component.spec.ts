import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgniteBarChartComponent } from './ignite-bar-chart.component';

describe('IgniteBarChartComponent', () => {
  let component: IgniteBarChartComponent;
  let fixture: ComponentFixture<IgniteBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgniteBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgniteBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
