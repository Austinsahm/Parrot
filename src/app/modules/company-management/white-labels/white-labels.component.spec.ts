import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelsComponent } from './white-labels.component';

describe('WhiteLabelsComponent', () => {
  let component: WhiteLabelsComponent;
  let fixture: ComponentFixture<WhiteLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
