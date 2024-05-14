import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAssetCreateComponent } from './corporate-asset-create.component';

describe('CorporateAssetCreateComponent', () => {
  let component: CorporateAssetCreateComponent;
  let fixture: ComponentFixture<CorporateAssetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAssetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
