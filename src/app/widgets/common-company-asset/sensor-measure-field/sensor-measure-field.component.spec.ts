import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorMeasureFieldComponent } from './sensor-measure-field.component';

describe('SensorMeasureFieldComponent', () => {
  let component: SensorMeasureFieldComponent;
  let fixture: ComponentFixture<SensorMeasureFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorMeasureFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorMeasureFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
