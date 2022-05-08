import { TestBed } from '@angular/core/testing';

import { LoginUserGuard } from './login-user.guard';

describe('LoginUserGuard', () => {
  let guard: LoginUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
