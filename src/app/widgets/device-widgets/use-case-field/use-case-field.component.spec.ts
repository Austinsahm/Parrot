import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseFieldComponent } from './use-case-field.component';

describe('UseCaseFieldComponent', () => {
  let component: UseCaseFieldComponent;
  let fixture: ComponentFixture<UseCaseFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCaseFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
