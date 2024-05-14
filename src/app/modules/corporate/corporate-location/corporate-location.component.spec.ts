import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLocationComponent } from './corporate-location.component';

describe('CorporateLocationComponent', () => {
  let component: CorporateLocationComponent;
  let fixture: ComponentFixture<CorporateLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
