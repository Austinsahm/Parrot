import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateWhiteLabelComponent } from './corporate-white-label.component';

describe('CorporateWhiteLabelComponent', () => {
  let component: CorporateWhiteLabelComponent;
  let fixture: ComponentFixture<CorporateWhiteLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateWhiteLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateWhiteLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
