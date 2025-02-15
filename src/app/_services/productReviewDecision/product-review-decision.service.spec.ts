import { TestBed } from '@angular/core/testing';

import { ProductReviewDecisionService } from './product-review-decision.service';

describe('ProductReviewDecisionService', () => {
  let service: ProductReviewDecisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductReviewDecisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
