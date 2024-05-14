import { TestBed } from '@angular/core/testing';

import { UseCaseService } from './use-case.service';

describe('UseCaseService', () => {
  let service: UseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
