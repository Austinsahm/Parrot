import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDeviceModalComponent } from './asset-device-modal.component';

describe('AssetDeviceModalComponent', () => {
  let component: AssetDeviceModalComponent;
  let fixture: ComponentFixture<AssetDeviceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDeviceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
