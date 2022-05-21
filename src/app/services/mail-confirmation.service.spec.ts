import { TestBed } from '@angular/core/testing';

import { MailConfirmationService } from './mail-confirmation.service';

describe('MailConfirmationService', () => {
  let service: MailConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
