import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDetailViewerComponent } from './asset-detail-viewer.component';

describe('AssetDetailViewerComponent', () => {
  let component: AssetDetailViewerComponent;
  let fixture: ComponentFixture<AssetDetailViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDetailViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
