import { TestBed } from '@angular/core/testing';

import { DateHttpService } from './date-http.service';

describe('DateHttpService', () => {
  let service: DateHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
