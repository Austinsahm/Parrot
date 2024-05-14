import { TestBed } from '@angular/core/testing';

import { SystemErrorHandlerService } from './system-error-handler.service';

describe('SystemErrorHandlerService', () => {
  let service: SystemErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
