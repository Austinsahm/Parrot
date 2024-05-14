import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAlertModalComponent } from './add-user-alert-modal.component';

describe('AddUserAlertModalComponent', () => {
  let component: AddUserAlertModalComponent;
  let fixture: ComponentFixture<AddUserAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAlertModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
