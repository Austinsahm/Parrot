import { TestBed } from '@angular/core/testing';

import { AssetHttpService } from './asset-http.service';

describe('AssetHttpService', () => {
  let service: AssetHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
