import { TestBed } from '@angular/core/testing';

import { UserDataAccessorService } from './user-data-accessor.service';

describe('UserDataAccessorService', () => {
  let service: UserDataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
