import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateTankShapeComponent } from './corporate-tank-shape.component';

describe('CorporateTankShapeComponent', () => {
  let component: CorporateTankShapeComponent;
  let fixture: ComponentFixture<CorporateTankShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateTankShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateTankShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
