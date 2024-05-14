import { TestBed } from '@angular/core/testing';

import { UserGroupDataAccessorService } from './user-group-data-accessor.service';

describe('UserGroupDataAccessorService', () => {
  let service: UserGroupDataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGroupDataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
