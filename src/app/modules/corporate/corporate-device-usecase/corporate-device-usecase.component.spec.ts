import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDeviceUsecaseComponent } from './corporate-device-usecase.component';

describe('CorporateDeviceUsecaseComponent', () => {
  let component: CorporateDeviceUsecaseComponent;
  let fixture: ComponentFixture<CorporateDeviceUsecaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateDeviceUsecaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDeviceUsecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
