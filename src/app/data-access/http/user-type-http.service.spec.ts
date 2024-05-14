import { TestBed } from '@angular/core/testing';

import { UserTypeHttpService } from './user-type-http.service';

describe('UserTypeHttpService', () => {
  let service: UserTypeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTypeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
