import { TestBed } from '@angular/core/testing';

import { ConfirmEmailComponentGuard } from './confirm-email-component.guard';

describe('ConfirmEmailComponentGuard', () => {
  let guard: ConfirmEmailComponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmEmailComponentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
