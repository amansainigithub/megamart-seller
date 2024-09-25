import { TestBed } from '@angular/core/testing';

import { SellerDataService } from './seller-data.service';

describe('SellerDataService', () => {
  let service: SellerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
