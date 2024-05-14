import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatePageComponent } from './corporate-page.component';

describe('CorporatePageComponent', () => {
  let component: CorporatePageComponent;
  let fixture: ComponentFixture<CorporatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
