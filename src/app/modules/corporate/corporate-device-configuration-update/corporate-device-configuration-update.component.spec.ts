import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceConfigurationUpdateComponent } from './corporate-device-configuration-update.component';

describe('CorporateDeviceConfigurationUpdateComponent', () => {
  let component: CorporateDeviceConfigurationUpdateComponent;
  let fixture: ComponentFixture<CorporateDeviceConfigurationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDeviceConfigurationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceConfigurationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
