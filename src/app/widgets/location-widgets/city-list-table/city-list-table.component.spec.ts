import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListTableComponent } from './city-list-table.component';

describe('CityListTableComponent', () => {
  let component: CityListTableComponent;
  let fixture: ComponentFixture<CityListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
