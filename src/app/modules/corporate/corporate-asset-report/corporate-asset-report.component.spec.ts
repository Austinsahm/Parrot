import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAssetReportComponent } from './corporate-asset-report.component';

describe('CorporateAssetReportComponent', () => {
  let component: CorporateAssetReportComponent;
  let fixture: ComponentFixture<CorporateAssetReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAssetReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAssetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
