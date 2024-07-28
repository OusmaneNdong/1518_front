import { TestBed } from '@angular/core/testing';

import { AutheGuardService } from './authe-guard.service';

describe('AutheGuardService', () => {
  let service: AutheGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutheGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
