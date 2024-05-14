import { TestBed } from '@angular/core/testing';

import { TankAssetService } from './tank-asset.service';

describe('TankAssetService', () => {
  let service: TankAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
