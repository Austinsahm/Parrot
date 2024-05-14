import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFormatFieldComponent } from './report-format-field.component';

describe('ReportFormatFieldComponent', () => {
  let component: ReportFormatFieldComponent;
  let fixture: ComponentFixture<ReportFormatFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFormatFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFormatFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
