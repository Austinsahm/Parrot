import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateTankLevelComponent } from './corporate-tank-level.component';

describe('CorporateTankLevelComponent', () => {
  let component: CorporateTankLevelComponent;
  let fixture: ComponentFixture<CorporateTankLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateTankLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateTankLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
