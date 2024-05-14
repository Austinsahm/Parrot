import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAssetListComponent } from './corporate-asset-list.component';

describe('CorporateAssetListComponent', () => {
  let component: CorporateAssetListComponent;
  let fixture: ComponentFixture<CorporateAssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
