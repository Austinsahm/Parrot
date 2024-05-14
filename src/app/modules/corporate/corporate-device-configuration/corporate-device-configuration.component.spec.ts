import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceConfigurationComponent } from './corporate-device-configuration.component';

describe('CorporateDeviceConfigurationComponent', () => {
  let component: CorporateDeviceConfigurationComponent;
  let fixture: ComponentFixture<CorporateDeviceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
