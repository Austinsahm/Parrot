import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAssetTrackerComponent } from './corporate-asset-tracker.component';

describe('CorporateAssetTrackerComponent', () => {
  let component: CorporateAssetTrackerComponent;
  let fixture: ComponentFixture<CorporateAssetTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssetTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAssetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
