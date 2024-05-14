import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayoutFooterComponent } from './page-layout-footer.component';

describe('PageLayoutFooterComponent', () => {
  let component: PageLayoutFooterComponent;
  let fixture: ComponentFixture<PageLayoutFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLayoutFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
