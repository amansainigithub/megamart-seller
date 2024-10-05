import { TestBed } from '@angular/core/testing';

import { SellerBankService } from './seller-bank.service';

describe('SellerBankService', () => {
  let service: SellerBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
