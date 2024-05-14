import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUpdateModalComponent } from './branch-update-modal.component';

describe('BranchUpdateModalComponent', () => {
  let component: BranchUpdateModalComponent;
  let fixture: ComponentFixture<BranchUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
