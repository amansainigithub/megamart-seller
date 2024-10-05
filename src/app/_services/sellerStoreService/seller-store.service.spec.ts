import { TestBed } from '@angular/core/testing';

import { SellerStoreService } from './seller-store.service';

describe('SellerStoreService', () => {
  let service: SellerStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
