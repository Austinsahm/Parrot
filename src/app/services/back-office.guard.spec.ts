import { TestBed } from '@angular/core/testing';

import { BackOfficeGuard } from './back-office.guard';

describe('BackOfficeGuard', () => {
  let guard: BackOfficeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BackOfficeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
