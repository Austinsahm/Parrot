import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateTankCardComponent } from './corporate-tank-card.component';

describe('CorporateTankCardComponent', () => {
  let component: CorporateTankCardComponent;
  let fixture: ComponentFixture<CorporateTankCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateTankCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateTankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
