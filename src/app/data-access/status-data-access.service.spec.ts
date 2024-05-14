import { TestBed } from '@angular/core/testing';

import { StatusDataAccessService } from './status-data-access.service';

describe('StatusDataAccessService', () => {
  let service: StatusDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
