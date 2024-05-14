import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFloorViewerComponent } from './asset-floor-viewer.component';

describe('AssetFloorViewerComponent', () => {
  let component: AssetFloorViewerComponent;
  let fixture: ComponentFixture<AssetFloorViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetFloorViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetFloorViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
