import { TestBed } from '@angular/core/testing';

import { AbstractDataAccessService } from './abstract-data-access.service';

describe('AbstractDataAccessService', () => {
  let service: AbstractDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
