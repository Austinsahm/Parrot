import { TestBed } from '@angular/core/testing';

import { RoleAuthorizationHttpService } from './role-authorization-http.service';

describe('RoleAuthorizationHttpService', () => {
  let service: RoleAuthorizationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAuthorizationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
