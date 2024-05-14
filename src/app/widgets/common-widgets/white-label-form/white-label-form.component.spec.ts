import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelFormComponent } from './white-label-form.component';

describe('WhiteLabelFormComponent', () => {
  let component: WhiteLabelFormComponent;
  let fixture: ComponentFixture<WhiteLabelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteLabelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteLabelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
