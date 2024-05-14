import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartMainComponent } from './pie-chart-main.component';

describe('PieChartMainComponent', () => {
  let component: PieChartMainComponent;
  let fixture: ComponentFixture<PieChartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
