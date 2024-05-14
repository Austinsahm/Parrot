import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAssetLandingComponent } from './corporate-asset-landing.component';

describe('CorporateAssetLandingComponent', () => {
  let component: CorporateAssetLandingComponent;
  let fixture: ComponentFixture<CorporateAssetLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssetLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAssetLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
