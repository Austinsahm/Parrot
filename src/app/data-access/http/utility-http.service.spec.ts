import { TestBed } from '@angular/core/testing';

import { UtilityHttpService } from './utility-http.service';

describe('UtilityHttpService', () => {
  let service: UtilityHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
