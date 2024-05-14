import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAssetComponent } from './corporate-asset.component';

describe('CorporateAssetComponent', () => {
  let component: CorporateAssetComponent;
  let fixture: ComponentFixture<CorporateAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
