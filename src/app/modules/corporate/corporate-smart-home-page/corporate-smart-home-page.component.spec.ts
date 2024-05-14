import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSmartHomePageComponent } from './corporate-smart-home-page.component';

describe('CorporateSmartHomePageComponent', () => {
  let component: CorporateSmartHomePageComponent;
  let fixture: ComponentFixture<CorporateSmartHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateSmartHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSmartHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
