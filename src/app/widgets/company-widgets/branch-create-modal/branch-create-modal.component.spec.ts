import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCreateModalComponent } from './branch-create-modal.component';

describe('BranchCreateModalComponent', () => {
  let component: BranchCreateModalComponent;
  let fixture: ComponentFixture<BranchCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
