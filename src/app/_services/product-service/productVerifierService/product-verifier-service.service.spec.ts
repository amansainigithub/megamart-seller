import { TestBed } from '@angular/core/testing';

import { ProductVerifierServiceService } from './product-verifier-service.service';

describe('ProductVerifierServiceService', () => {
  let service: ProductVerifierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVerifierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
