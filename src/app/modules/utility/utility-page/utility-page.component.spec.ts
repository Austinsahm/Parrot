import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityPageComponent } from './utility-page.component';

describe('UtilityPageComponent', () => {
  let component: UtilityPageComponent;
  let fixture: ComponentFixture<UtilityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
