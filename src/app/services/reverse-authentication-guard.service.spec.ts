import { TestBed } from '@angular/core/testing';

import { ReverseAuthenticationGuard } from './reverse-authentication-guard.service';

describe('ReverseAuthenticationGuardService', () => {
  let service: ReverseAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseAuthenticationGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
