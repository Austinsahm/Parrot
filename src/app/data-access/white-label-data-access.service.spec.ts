import { TestBed } from '@angular/core/testing';

import { WhiteLabelDataAccessService } from './white-label-data-access.service';

describe('WhiteLabelDataAccessService', () => {
  let service: WhiteLabelDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiteLabelDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
