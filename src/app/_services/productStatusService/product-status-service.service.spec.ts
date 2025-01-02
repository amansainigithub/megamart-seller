import { TestBed } from '@angular/core/testing';

import { ProductStatusServiceService } from './product-status-service.service';

describe('ProductStatusServiceService', () => {
  let service: ProductStatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
