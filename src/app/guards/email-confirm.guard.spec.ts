import { TestBed } from '@angular/core/testing';

import { EmailConfirmGuard } from './email-confirm.guard';

describe('EmailConfirmGuard', () => {
  let guard: EmailConfirmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmailConfirmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
