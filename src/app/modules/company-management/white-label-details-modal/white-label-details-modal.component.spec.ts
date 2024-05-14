import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelDetailsModalComponent } from './white-label-details-modal.component';

describe('WhiteLabelDetailsModalComponent', () => {
  let component: WhiteLabelDetailsModalComponent;
  let fixture: ComponentFixture<WhiteLabelDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteLabelDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteLabelDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
