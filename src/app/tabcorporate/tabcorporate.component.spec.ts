import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcorporateComponent } from './tabcorporate.component';

describe('TabcorporateComponent', () => {
  let component: TabcorporateComponent;
  let fixture: ComponentFixture<TabcorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabcorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
