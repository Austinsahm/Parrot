import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAssetDetailComponent } from './corporate-asset-detail.component';

describe('CorporateAssetDetailComponent', () => {
  let component: CorporateAssetDetailComponent;
  let fixture: ComponentFixture<CorporateAssetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
