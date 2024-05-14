import { TestBed } from '@angular/core/testing';

import { WhiteLabelHttpService } from './white-label-http.service';

describe('WhiteLabelHttpService', () => {
  let service: WhiteLabelHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiteLabelHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
