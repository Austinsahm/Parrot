import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDeviceListComponent } from './asset-device-list.component';

describe('AssetDeviceListComponent', () => {
  let component: AssetDeviceListComponent;
  let fixture: ComponentFixture<AssetDeviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDeviceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
