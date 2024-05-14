import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchFieldComponent } from './branch-field.component';

describe('BranchFieldComponent', () => {
  let component: BranchFieldComponent;
  let fixture: ComponentFixture<BranchFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
