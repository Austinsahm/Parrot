import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorFieldComponent } from './sensor-field.component';

describe('SensorFieldComponent', () => {
  let component: SensorFieldComponent;
  let fixture: ComponentFixture<SensorFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
