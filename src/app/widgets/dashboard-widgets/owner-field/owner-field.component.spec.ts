import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFieldComponent } from './owner-field.component';

describe('OwnerFieldComponent', () => {
  let component: OwnerFieldComponent;
  let fixture: ComponentFixture<OwnerFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
