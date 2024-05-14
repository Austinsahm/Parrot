import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUtilityComponent } from './corporate-utility.component';

describe('CorporateUtilityComponent', () => {
  let component: CorporateUtilityComponent;
  let fixture: ComponentFixture<CorporateUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
