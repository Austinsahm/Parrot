import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSensorModalComponent } from './add-sensor-modal.component';

describe('AddSensorModalComponent', () => {
  let component: AddSensorModalComponent;
  let fixture: ComponentFixture<AddSensorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSensorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSensorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
