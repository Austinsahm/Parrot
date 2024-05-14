import { TestBed } from '@angular/core/testing';

import { StateHttpService } from './state-http.service';

describe('StateHttpService', () => {
  let service: StateHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
