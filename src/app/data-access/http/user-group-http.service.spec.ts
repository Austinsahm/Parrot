import { TestBed } from '@angular/core/testing';

import { UserGroupHttpService } from './user-group-http.service';

describe('UserGroupHttpService', () => {
  let service: UserGroupHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGroupHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
