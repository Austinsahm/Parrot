import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceCategoryMatchComponent } from './corporate-device-category-match.component';

describe('CorporateDeviceCategoryMatchComponent', () => {
  let component: CorporateDeviceCategoryMatchComponent;
  let fixture: ComponentFixture<CorporateDeviceCategoryMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceCategoryMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceCategoryMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
