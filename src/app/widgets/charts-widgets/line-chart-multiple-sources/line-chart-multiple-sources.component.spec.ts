import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartMultipleSourcesComponent } from './line-chart-multiple-sources.component';

describe('LineChartMultipleSourcesComponent', () => {
  let component: LineChartMultipleSourcesComponent;
  let fixture: ComponentFixture<LineChartMultipleSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartMultipleSourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartMultipleSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
