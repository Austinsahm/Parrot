import { TestBed } from '@angular/core/testing';

import { CorporateGuard } from './corporate.guard';

describe('CorporateGuard', () => {
  let guard: CorporateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CorporateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
