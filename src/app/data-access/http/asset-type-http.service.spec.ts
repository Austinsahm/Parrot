import { TestBed } from '@angular/core/testing';

import { AssetTypeHttpService } from './asset-type-http.service';

describe('AssetTypeHttpService', () => {
  let service: AssetTypeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetTypeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
