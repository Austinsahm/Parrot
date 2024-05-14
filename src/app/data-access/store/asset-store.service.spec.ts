import { TestBed } from '@angular/core/testing';

import { AssetStoreService } from './asset-store.service';

describe('AssetStoreService', () => {
  let service: AssetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
