import { TestBed } from '@angular/core/testing';

import { AssetDataAccessService } from './asset-data-access.service';

describe('AssetDataAccessService', () => {
  let service: AssetDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
