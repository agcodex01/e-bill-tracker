import { TestBed } from '@angular/core/testing';

import { StartGuardService } from './start-guard.service';

describe('StartGuardService', () => {
  let service: StartGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
