import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartFieldComponent } from './time-chart-field.component';

describe('TimeChartFieldComponent', () => {
  let component: TimeChartFieldComponent;
  let fixture: ComponentFixture<TimeChartFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeChartFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
