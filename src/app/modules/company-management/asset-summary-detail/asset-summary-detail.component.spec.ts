import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSummaryDetailComponent } from './asset-summary-detail.component';

describe('AssetSummaryDetailComponent', () => {
  let component: AssetSummaryDetailComponent;
  let fixture: ComponentFixture<AssetSummaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSummaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
