import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelListComponent } from './white-label-list.component';

describe('WhiteLabelListComponent', () => {
  let component: WhiteLabelListComponent;
  let fixture: ComponentFixture<WhiteLabelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteLabelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteLabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
