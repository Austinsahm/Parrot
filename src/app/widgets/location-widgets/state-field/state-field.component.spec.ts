import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFieldComponent } from './state-field.component';

describe('StateFieldComponent', () => {
  let component: StateFieldComponent;
  let fixture: ComponentFixture<StateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
