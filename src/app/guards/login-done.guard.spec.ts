import { TestBed } from '@angular/core/testing';

import { LoginDoneGuard } from './login-done.guard';

describe('LoginDoneGuard', () => {
  let guard: LoginDoneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginDoneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
