import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFloorModalComponent } from './asset-floor-modal.component';

describe('AssetFloorModalComponent', () => {
  let component: AssetFloorModalComponent;
  let fixture: ComponentFixture<AssetFloorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetFloorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetFloorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
