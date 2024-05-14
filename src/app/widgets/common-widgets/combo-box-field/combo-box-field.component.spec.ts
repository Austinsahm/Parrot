import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxFieldComponent } from './combo-box-field.component';

describe('ComboBoxFieldComponent', () => {
  let component: ComboBoxFieldComponent;
  let fixture: ComponentFixture<ComboBoxFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboBoxFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
