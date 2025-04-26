import { TestBed } from '@angular/core/testing';

import { OrderPaymentRefundService } from './order-payment-refund.service';

describe('OrderPaymentRefundService', () => {
  let service: OrderPaymentRefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPaymentRefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
