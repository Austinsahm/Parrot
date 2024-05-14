import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticChartFieldComponent } from './static-chart-field.component';

describe('StaticChartFieldComponent', () => {
  let component: StaticChartFieldComponent;
  let fixture: ComponentFixture<StaticChartFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticChartFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticChartFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
