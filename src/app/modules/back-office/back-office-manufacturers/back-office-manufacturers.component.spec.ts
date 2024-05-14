import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeManufacturersComponent } from './back-office-manufacturers.component';

describe('BackOfficeManufacturersComponent', () => {
  let component: BackOfficeManufacturersComponent;
  let fixture: ComponentFixture<BackOfficeManufacturersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackOfficeManufacturersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
