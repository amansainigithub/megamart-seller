import { TestBed } from '@angular/core/testing';

import { SellerPickupService } from './seller-pickup.service';

describe('SellerPickupService', () => {
  let service: SellerPickupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerPickupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
