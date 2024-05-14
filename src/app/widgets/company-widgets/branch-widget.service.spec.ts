import { TestBed } from '@angular/core/testing';

import { BranchWidgetService } from './branch-widget.service';

describe('BranchWidgetService', () => {
  let service: BranchWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
