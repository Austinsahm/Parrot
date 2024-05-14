import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCitiesComponent } from './back-office-cities.component';

describe('BackOfficeCitiesComponent', () => {
  let component: BackOfficeCitiesComponent;
  let fixture: ComponentFixture<BackOfficeCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
