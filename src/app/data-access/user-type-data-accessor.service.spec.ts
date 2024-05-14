import { TestBed } from '@angular/core/testing';

import { UserTypeDataAccessorService } from './user-type-data-accessor.service';

describe('UserTypeDataAccessorService', () => {
  let service: UserTypeDataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTypeDataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
