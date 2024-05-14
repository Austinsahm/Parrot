import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankShapeCssComponent } from './tank-shape-css.component';

describe('TankShapeCssComponent', () => {
  let component: TankShapeCssComponent;
  let fixture: ComponentFixture<TankShapeCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankShapeCssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankShapeCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
