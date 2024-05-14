import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLocationListComponent } from './corporate-location-list.component';

describe('CorporateLocationListComponent', () => {
  let component: CorporateLocationListComponent;
  let fixture: ComponentFixture<CorporateLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateLocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
