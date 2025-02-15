import { TestBed } from '@angular/core/testing';

import { ProductReviewStatusService } from './product-review-status.service';

describe('ProductReviewStatusService', () => {
  let service: ProductReviewStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductReviewStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
