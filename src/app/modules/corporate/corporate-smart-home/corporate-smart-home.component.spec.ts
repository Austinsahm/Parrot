import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSmartHomeComponent } from './corporate-smart-home.component';

describe('CorporateSmartHomeComponent', () => {
  let component: CorporateSmartHomeComponent;
  let fixture: ComponentFixture<CorporateSmartHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateSmartHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSmartHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
