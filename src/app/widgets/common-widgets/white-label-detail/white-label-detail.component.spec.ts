import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteLabelDetailComponent } from './white-label-detail.component';

describe('WhiteLabelDetailComponent', () => {
  let component: WhiteLabelDetailComponent;
  let fixture: ComponentFixture<WhiteLabelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteLabelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteLabelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
