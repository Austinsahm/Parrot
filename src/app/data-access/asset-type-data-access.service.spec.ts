import { TestBed } from '@angular/core/testing';

import { AssetTypeDataAccessService } from './asset-type-data-access.service';

describe('AssetTypeDataAccessService', () => {
  let service: AssetTypeDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetTypeDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
