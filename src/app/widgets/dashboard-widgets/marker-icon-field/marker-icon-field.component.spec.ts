import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerIconFieldComponent } from './marker-icon-field.component';

describe('MarkerIconFieldComponent', () => {
  let component: MarkerIconFieldComponent;
  let fixture: ComponentFixture<MarkerIconFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerIconFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerIconFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
