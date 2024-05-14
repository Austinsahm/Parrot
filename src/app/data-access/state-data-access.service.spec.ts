import { TestBed } from '@angular/core/testing';

import { StateDataAccessService } from './state-data-access.service';

describe('StateDataAccessService', () => {
  let service: StateDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
