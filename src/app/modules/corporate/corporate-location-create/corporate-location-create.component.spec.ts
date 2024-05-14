import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLocationCreateComponent } from './corporate-location-create.component';

describe('CorporateLocationCreateComponent', () => {
  let component: CorporateLocationCreateComponent;
  let fixture: ComponentFixture<CorporateLocationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateLocationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLocationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
