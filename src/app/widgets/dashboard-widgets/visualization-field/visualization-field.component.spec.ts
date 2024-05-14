import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationFieldComponent } from './visualization-field.component';

describe('VisualizationFieldComponent', () => {
  let component: VisualizationFieldComponent;
  let fixture: ComponentFixture<VisualizationFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
