import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeFieldComponent } from './asset-type-field.component';

describe('AssetTypeFieldComponent', () => {
  let component: AssetTypeFieldComponent;
  let fixture: ComponentFixture<AssetTypeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
