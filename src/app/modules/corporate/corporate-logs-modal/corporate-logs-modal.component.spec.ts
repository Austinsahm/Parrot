import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLogsModalComponent } from './corporate-logs-modal.component';

describe('CorporateLogsModalComponent', () => {
  let component: CorporateLogsModalComponent;
  let fixture: ComponentFixture<CorporateLogsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateLogsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateLogsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
