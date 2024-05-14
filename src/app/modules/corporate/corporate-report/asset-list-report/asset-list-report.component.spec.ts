import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetListReportComponent } from './asset-list-report.component';

describe('AssetListReportComponent', () => {
  let component: AssetListReportComponent;
  let fixture: ComponentFixture<AssetListReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetListReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
